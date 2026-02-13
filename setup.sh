#!/bin/bash

# Portfolio Setup Script
# Автоматичне встановлення всіх файлів на свої місця

echo "🚀 Starting Portfolio Setup..."
echo "================================"

# Кольори для виводу
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Функція для виводу помилок
error() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# Функція для виводу успіху
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Функція для виводу попередження
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Перевірка чи знаходимось в правильній директорії
if [ ! -f "manage.py" ]; then
    error "manage.py not found! Please run this script from the project root directory."
fi

echo ""
echo "📁 Creating directory structure..."

# Створення директорій для статичних файлів
mkdir -p portfolio/static/portfolio/css
mkdir -p portfolio/static/portfolio/js
mkdir -p portfolio/static/portfolio/img
mkdir -p portfolio/templates/portfolio
mkdir -p media/profile
mkdir -p media/services
mkdir -p media/skills

success "Directories created"

echo ""
echo "📄 Copying template files..."

# Копіювання HTML template
if [ -f "home_template.html" ]; then
    cp home_template.html portfolio/templates/portfolio/home.html
    success "HTML template copied"
else
    warning "home_template.html not found, skipping..."
fi

echo ""
echo "🎨 Copying CSS files..."

# Копіювання CSS
if [ -f "style.css" ]; then
    cp style.css portfolio/static/portfolio/css/style.css
    success "CSS file copied"
else
    warning "style.css not found, skipping..."
fi

echo ""
echo "⚡ Copying JavaScript files..."

# Копіювання JavaScript
if [ -f "main.js" ]; then
    cp main.js portfolio/static/portfolio/js/main.js
    success "JavaScript file copied"
else
    warning "main.js not found, skipping..."
fi

echo ""
echo "🔧 Copying views.py..."

# Копіювання views
if [ -f "views.py" ]; then
    cp views.py portfolio/views.py
    success "views.py copied"
else
    warning "views.py not found, skipping..."
fi

echo ""
echo "🗄️  Running database migrations..."

# Запуск міграцій
python manage.py makemigrations portfolio
python manage.py migrate

success "Database migrations completed"

echo ""
echo "📊 Collecting static files..."

# Збір статичних файлів
python manage.py collectstatic --noinput --clear 2>/dev/null

success "Static files collected"

echo ""
echo "================================"
echo -e "${GREEN}✨ Setup completed successfully!${NC}"
echo ""
echo "📝 Next steps:"
echo "   1. Create superuser: python manage.py createsuperuser"
echo "   2. Run server: python manage.py runserver"
echo "   3. Open browser: http://localhost:8000"
echo "   4. Admin panel: http://localhost:8000/admin"
echo ""
echo "📚 Check README.md for more information"
echo "================================"