#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

rm -rf staticfies
python manage.py collectstatic --no-input --clear
python manage.py migrate

# Create superuser if it doesn't exist (requires ADMIN_PASSWORD env var)
python manage.py createsu