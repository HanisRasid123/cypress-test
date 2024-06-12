# Function to prompt the user for input
function Prompt-User {
    $inputValue = Read-Host "Enter testing stage (SIT/UAT)"

    # Set environment variables based on user input
    if ($inputValue.ToLower() -eq "sit") {
        $env:to = 'sit-auto-sanity@healthrfid.com'
        $env:host = 'https://sit-vifm.controlpoint.healthrfid.com'
        Write-Host "Environment variables are set to: to=$env:to, host=$env:host"
    }
    elseif ($inputValue.ToLower() -eq "uat") {
        $env:to = 'uat-auto-sanity@healthrfid.com'
        $env:host = 'https://uat-vifm.controlpoint.healthrfid.com'
        Write-Host "Email recipient will be: $env:to"
    }
    elseif ($inputValue.ToLower() -eq "hanis") {
        $env:to = 'hanis.rasid@healthrfid.com'
        $env:host = 'https://sit-vifm.controlpoint.healthrfid.com'
        Write-Host "Environment variables are set to: to=$env:to, host=$env:host"
    }
        elseif ($inputValue.ToLower() -eq "ankit") {
        $env:to ="ankit.saurabh@healthrfid.com"
        $env:host = 'https://sit-vifm.controlpoint.healthrfid.com'
        Write-Host "Environment variables are set to: to=$env:to, host=$env:host"
    }
    else {
        Write-Host "Wrong input. Please try again."
        # Reprompt the user if the input is incorrect
        Prompt-User
    }
}

# Initial prompt
$env:user = 'AKIA25CJOWA6CPJY7LVH'
$env:pass = 'BLJgRpABC8l7owAf7TB9gLF3GnL27HWwGM0+Cm8yMp5y'
Prompt-User

npm run cypress:run