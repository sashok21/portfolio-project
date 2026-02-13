from django.db import models


class OwnerProfile(models.Model):
    name = models.CharField("Ім'я та Прізвище", max_length=100, default="Я Влад")
    role = models.CharField("Посада (хедер)", max_length=100, default="графічний дизайнер")
    photo = models.ImageField("Фото профілю", upload_to="profile/")
    about_text = models.TextField("Текст 'Про себе'")

    # Контакти
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    behance = models.URLField(blank=True)
    instagram = models.URLField(blank=True)

    def __str__(self):
        return "Налаштування Профілю (Редагувати це)"

    class Meta:
        verbose_name = "Профіль власника"
        verbose_name_plural = "Профіль власника"


class Experience(models.Model):
    company = models.CharField("Компанія", max_length=100)
    position = models.CharField("Посада", max_length=100)
    period = models.CharField("Період", max_length=50, help_text="Напр: Sep 2019 - July 2023")
    description = models.TextField("Опис обов'язків", blank=True)
    order = models.IntegerField("Порядок відображення", default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Досвід роботи"
        verbose_name_plural = "Досвід роботи"

    def __str__(self):
        return f"{self.company} - {self.position}"


class Service(models.Model):
    title = models.CharField("Назва послуги", max_length=100)
    image = models.ImageField("Картинка картки", upload_to="services/")
    link = models.URLField("Посилання (опціонально)", blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Послуга"
        verbose_name_plural = "Послуги"


class Skill(models.Model):
    name = models.CharField("Назва скіла", max_length=50)
    icon = models.ImageField("Іконка", upload_to="skills/")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Навичка (Skill)"
        verbose_name_plural = "Навички"