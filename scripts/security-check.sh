#!/bin/bash
# Security audit script for sensitive files
# Usage: ./scripts/security-check.sh

echo "🔍 Security Audit - Checking for sensitive files..."
echo "=================================================="

# Check for .env files
echo "1. Checking for .env files..."
env_files=$(find . -name "*.env*" ! -path "./.git/*" ! -name "*.example")
if [ -z "$env_files" ]; then
    echo "   ✅ No .env files found"
else
    echo "   ⚠️  Found .env files:"
    echo "$env_files"
fi

# Check for files with sensitive names
echo "2. Checking for files with sensitive names..."
sensitive_files=$(find . -type f \( -name "*secret*" -o -name "*key*" -o -name "*credential*" -o -name "*password*" \) ! -path "./.git/*" ! -name "package-lock.json" ! -name "*.md")
if [ -z "$sensitive_files" ]; then
    echo "   ✅ No files with sensitive names found"
else
    echo "   ⚠️  Found files with sensitive names:"
    echo "$sensitive_files"
fi

# Check for hardcoded secrets in code
echo "3. Checking for hardcoded secrets in code..."
secrets_in_code=$(grep -r -i "password\s*=\s*['\"][^'\"]*['\"]" . --include="*.js" --include="*.json" --exclude-dir=node_modules --exclude-dir=.git | grep -v "process.env" | head -5)
if [ -z "$secrets_in_code" ]; then
    echo "   ✅ No obvious hardcoded secrets found"
else
    echo "   ⚠️  Potential hardcoded secrets found:"
    echo "$secrets_in_code"
fi

# Check API keys pattern
echo "4. Checking for API key patterns..."
api_keys=$(grep -r -E "api[_-]?key\s*=\s*['\"][a-zA-Z0-9]{10,}['\"]" . --include="*.js" --include="*.json" --exclude-dir=node_modules --exclude-dir=.git | head -5)
if [ -z "$api_keys" ]; then
    echo "   ✅ No hardcoded API keys found"
else
    echo "   ⚠️  Potential API keys found:"
    echo "$api_keys"
fi

echo ""
echo "🎯 Summary:"
if [ -z "$env_files" ] && [ -z "$sensitive_files" ] && [ -z "$secrets_in_code" ] && [ -z "$api_keys" ]; then
    echo "   ✅ Repository appears secure - no sensitive files detected"
else
    echo "   ⚠️  Please review the findings above"
fi

echo ""
echo "💡 Remember:"
echo "   - Use environment variables for all sensitive configuration"
echo "   - Keep .env files out of version control"
echo "   - Review SECURITY.md for full guidelines"