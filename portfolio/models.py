from django.db import models


class OwnerProfile(models.Model):
    """
    Singleton model for storing the portfolio owner's personal details and theme settings.
    """
    name = models.CharField(
        "Full Name",
        max_length=100,
        default="Vlad"
    )
    role = models.CharField(
        "Role (Header)",
        max_length=100,
        default="Graphic Designer"
    )
    photo = models.ImageField(
        "Profile Photo",
        upload_to="profile/",
        blank=True,
        null=True
    )
    about_text = models.TextField(
        "About Me Text",
        default="Description about me..."
    )

    # General Contacts
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

    # Emoji Theme Settings (About Section)
    emoji_main = models.CharField(
        "Main Emoji (Big)",
        max_length=10,
        default="👋",
        help_text="The large emoji in the center."
    )
    emoji_top_right = models.CharField(
        "Deco Emoji 1 (Top Right)",
        max_length=10,
        default="👋",
        help_text="Floating emoji top-right."
    )
    emoji_bottom_left = models.CharField(
        "Deco Emoji 2 (Bottom Left)",
        max_length=10,
        default="💡",
        help_text="Floating emoji bottom-left."
    )
    emoji_top_left = models.CharField(
        "Deco Emoji 3 (Top Left)",
        max_length=10,
        default="⚡",
        help_text="Floating emoji top-left."
    )

    def __str__(self):
        return "Profile Settings"

    class Meta:
        verbose_name = "Owner Profile"
        verbose_name_plural = "Owner Profiles"


class SocialLink(models.Model):
    """
    Model for dynamic social media links displayed in the footer/contact section.
    """
    name = models.CharField(
        "Network Name",
        max_length=50,
        help_text="e.g. Instagram, LinkedIn"
    )
    icon = models.FileField(
        "Icon",
        upload_to="socials/",
        help_text="SVG or PNG format recommended"
    )
    link = models.URLField("URL")
    order = models.IntegerField(
        "Display Order",
        default=0
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return self.name


class Experience(models.Model):
    """
    Model representing work experience entries.
    """
    company = models.CharField("Company", max_length=100)
    position = models.CharField("Position", max_length=100)
    period = models.CharField(
        "Period",
        max_length=50,
        help_text="e.g. Sep 2019 - July 2023"
    )
    description = models.TextField("Job Description", blank=True)
    order = models.IntegerField("Display Order", default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"

    def __str__(self):
        return f"{self.company} - {self.position}"


class Service(models.Model):
    """
    Model for services offered by the portfolio owner.
    """
    title = models.CharField("Service Title", max_length=100)
    image = models.ImageField("Card Image", upload_to="services/")
    link = models.URLField("Link (Optional)", blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"


class Skill(models.Model):
    """
    Model for technical or professional skills.
    """
    name = models.CharField("Skill Name", max_length=50)
    icon = models.ImageField("Icon", upload_to="skills/")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"