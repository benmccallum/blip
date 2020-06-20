@if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

:: ----------------------
:: KUDU Deployment Script
:: Version: 1.0.15
:: ----------------------

:: Prerequisites
:: -------------

:: Verify node.js installed
where node 2>nul >nul
IF %ERRORLEVEL% NEQ 0 (
  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
  goto error
)

:: Setup
:: -----

setlocal enabledelayedexpansion

SET ARTIFACTS=%~dp0%..\artifacts

IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%.
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)

IF NOT DEFINED NEXT_MANIFEST_PATH (
  SET NEXT_MANIFEST_PATH=%ARTIFACTS%\manifest

  IF NOT DEFINED PREVIOUS_MANIFEST_PATH (
    SET PREVIOUS_MANIFEST_PATH=%ARTIFACTS%\manifest
  )
)

IF NOT DEFINED KUDU_SYNC_CMD (
  :: Install kudu sync
  echo Installing Kudu Sync
  call npm install kudusync -g --silent
  IF !ERRORLEVEL! NEQ 0 goto error

  :: Locally just running "kuduSync" would also work
  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
)
goto Deployment

:: Utility Functions
:: -----------------

:SelectNodeVersion

IF DEFINED KUDU_SELECT_NODE_VERSION_CMD (
  :: The following are done only on Windows Azure Websites environment
  call %KUDU_SELECT_NODE_VERSION_CMD% "%DEPLOYMENT_SOURCE%" "%DEPLOYMENT_TARGET%" "%DEPLOYMENT_TEMP%"
  IF !ERRORLEVEL! NEQ 0 goto error

  IF EXIST "%DEPLOYMENT_TEMP%\__nodeVersion.tmp" (
    SET /p NODE_EXE=<"%DEPLOYMENT_TEMP%\__nodeVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )

  IF EXIST "%DEPLOYMENT_TEMP%\__npmVersion.tmp" (
    SET /p NPM_JS_PATH=<"%DEPLOYMENT_TEMP%\__npmVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )

  IF NOT DEFINED NODE_EXE (
    SET NODE_EXE=node
  )

  SET NPM_CMD="!NODE_EXE!" "!NPM_JS_PATH!"
) ELSE (
  SET NPM_CMD=npm
  SET NODE_EXE=node
)

goto :EOF

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: ----------

:Deployment
echo Handling deployment. 

:: 0. Select node version
call :SelectNodeVersion
echo NPM version:
call :ExecuteCmd !NPM_CMD! --version

:: 1. Installing dependencies
echo 1. Installing dependencies
call :ExecuteCmd !NPM_CMD! install --only=prod
IF !ERRORLEVEL! NEQ 0 goto error

:: 2. Build
echo 2. Building app 
call :ExecuteCmd !NPM_CMD! run build
IF !ERRORLEVEL! NEQ 0 goto error

:: 3. KuduSync files
echo 3. Kudu syncing files to deployment target
call :ExecuteCmd "%KUDU_SYNC_CMD%" -v 50 -f "%DEPLOYMENT_SOURCE%"\dist -t "%DEPLOYMENT_TARGET%" -n "%NEXT_MANIFEST_PATH%" -p "%PREVIOUS_MANIFEST_PATH%" -i ".git;.hg;.deployment;deploy.cmd"
IF !ERRORLEVEL! NEQ 0 goto error

:: 4. Purge CDN cache of all caches files
:: Requires an application to be setup in the Azure Active Directory on the same tenant, 
:: with a client id and key/secret, and permissions to the Azure CDN Endpoint (CDN Endpoint Contributor)
::SET CLIENT_ID="from-app-settings"
::SET CLIENT_SECRET="from-app-settings"
IF NOT DEFINED CLIENT_ID ( 
  echo 4. Skipping Azure CDN cache purge. App Setting "CLIENT_ID" was not found. Potentially this is a local test deployment run.
  goto end 
)
IF NOT DEFINED CLIENT_SECRET ( 
  echo 4. Skipping Azure CDN cache purge. App Setting "CLIENT_SECRET" was not found. Potentially this is a local test deployment run.
  goto end 
)

echo 5. Purging CDN of all cached files
SET CURL_CMD="%DEPLOYMENT_SOURCE%\build\curl-7.55.1-win64-mingw\bin\curl.exe"
SET JQ_CMD="%DEPLOYMENT_SOURCE%\build\jq\jq-win64.exe" -r
SET ACCESS_TOKEN_TMP_FILE=access_token.tmp

SET TENANT_ID=979c7556-2382-40a9-a730-7af1e4233b55

:: Request access token, then grab it out of the response JSON with jq.exe and store it in a tmp file
%CURL_CMD% -X POST ^
  -F "grant_type=client_credentials" ^
  -F "client_id=%CLIENT_ID%" ^
  -F "client_secret=%CLIENT_SECRET%" ^
  -F "resource=https://management.core.windows.net/" ^
  https://login.windows.net/%TENANT_ID%/oauth2/token | %JQ_CMD% .access_token > %ACCESS_TOKEN_TMP_FILE%

:: Set access token in a variable
for /f "tokens=*" %%a in (%ACCESS_TOKEN_TMP_FILE%) do (
  SET ACCESS_TOKEN=%%a
)
call del %ACCESS_TOKEN_TMP_FILE%

SET SUBSCRIPTION_ID=68667b16-e134-4e46-a29b-6f8ae4d90f50
SET RESOURCE_GROUP=blip
SET CDN_PROFILE=blip
SET CDN_ENDPOINT=blip

call :ExecuteCmd %CURL_CMD% -X POST ^
  -H "Authorization: Bearer %ACCESS_TOKEN%" ^
  -H "Content-Type: application/json" ^
  -H "Accept: application/json" ^
  -d "{ \"contentPaths\": [ \"/*\" ] }" ^
  https://management.azure.com/subscriptions/%SUBSCRIPTION_ID%/resourceGroups/%RESOURCE_GROUP%/providers/Microsoft.Cdn/profiles/%CDN_PROFILE%/endpoints/%CDN_ENDPOINT%/purge?api-version=2016-10-02
IF !ERRORLEVEL! NEQ 0 goto error

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
goto end

:: Execute command routine that will echo out when error
:ExecuteCmd
setlocal
set _CMD_=%*
call %_CMD_%
if "%ERRORLEVEL%" NEQ "0" echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
exit /b %ERRORLEVEL%

:error
endlocal
echo An error has occurred during web site deployment.
call :exitSetErrorLevel
call :exitFromFunction 2>nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal
echo Finished successfully.
