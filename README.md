# Steps to run script in a new environment
1. npm i 
2. Run powershell as an administrator and run 'Set-ExecutionPolicy RemoteSigned'. Choose 'Y' to confirm the change.
3. Run '.\run.ps1' to execute script for automation testing

## VIFM
- Ensure that an alert is available to be tested on (dashboard) alert used: E28069952000444
- Ensure test user is created (should have been assigned to a user group)
- Ensure test user group is created
- Download files are verified by checking file extension
- Upload users file can't be run multiple times because of unique user restraint
- Location can't be created as there is no delete option
- There's no way the alerts configurations can be tested
- Can't test E-Tag configuration

