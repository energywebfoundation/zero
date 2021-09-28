#!/bin/bash

REQUIRED_VARIABLES=(
  API_BASE_URL
)

# Recreate config file
rm -rf ./env-config.json
touch ./env-config.json

# Add assignment
echo "{" >> ./env-config.json

envToRead=.env
rootEnvFile=../../../.env
if [ ! -e "$envToRead" ]; then
    envToRead=$rootEnvFile
fi

pos=$(( ${#REQUIRED_VARIABLES[*]} - 1 ))
last=${REQUIRED_VARIABLES[$pos]}

for i in "${REQUIRED_VARIABLES[@]}"
  do
    varname="$i"
    value=$(printf '%s\n' "${!varname}")

    if [ -z "$value" ]; then
      if test -f $envToRead; then
        value=$(grep -e '^'$varname'=.*' $envToRead | cut -d '=' -f2 | xargs)
      fi
    fi

    if [[ $i == $last ]]; then
        echo "    \"$varname\": \"$value\"" >> ./env-config.json
      else
        echo "    \"$varname\": \"$value\"," >> ./env-config.json
    fi
  done

echo "}" >> ./env-config.json
