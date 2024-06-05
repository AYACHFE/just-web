#!/bin/bash

# Add all changes to staging
git add .

# Prompt for commit message
echo "Enter commit message: "
read commit_message

# Commit with the provided message
git commit -m "$commit_message"

# Push changes to remote repository
git push