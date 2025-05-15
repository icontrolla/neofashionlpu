from django.db import models

class Faculty(models.Model):
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='faculty_photos/', blank=True)

    def __str__(self):
        return self.name

class Gallery(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery_images/')
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



class FashionCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

def __str__(self):
    return self.name

class FashionItem(models.Model):
    SUBCATEGORY_CHOICES = [
        # Avant-Garde
        ('experimental-silhouettes', 'Experimental Silhouettes'),
        ('futuristic-couture', 'Futuristic Couture'),
        ('abstract-fusion', 'Abstract Fusion'),
        # Streetwear
        ('urban-casual', 'Urban Casual'),
        ('graffiti-inspired', 'Graffiti-Inspired'),
        ('skate-culture', 'Skate Culture'),
        # Couture
        ('runway-elegance', 'Runway Elegance'),
        ('opulent-craftsmanship', 'Opulent Craftsmanship'),
        ('timeless-luxury', 'Timeless Luxury'),
        # Sustainable
        ('eco-friendly-designs', 'Eco-Friendly Designs'),
        ('recycled-materials', 'Recycled Materials'),
        ('green-couture', 'Green Couture'),
        # Bohemian
        ('free-spirited-flow', 'Free-Spirited Flow'),
        ('desert-vibes', 'Desert Vibes'),
        ('gypsy-aesthetic', 'Gypsy Aesthetic'),
        # Minimalist
        ('clean-lines', 'Clean Lines'),
        ('monochrome-elegance', 'Monochrome Elegance'),
        ('pure-simplicity', 'Pure Simplicity'),
        # Vintage
        ('retro-revival', 'Retro Revival'),
        ('classic-flair', 'Classic Flair'),
        ('old-hollywood-glam', 'Old Hollywood Glam'),
    ]

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='fashion_items/')
    category = models.ForeignKey(FashionCategory, on_delete=models.CASCADE, related_name='items')
    subcategory = models.CharField(max_length=100, choices=SUBCATEGORY_CHOICES, blank=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_minted = models.BooleanField(default=False)
    mint_address = models.CharField(max_length=200, blank=True, null=True)
    token_id = models.CharField(max_length=200, blank=True, null=True)
    price_eth = models.DecimalField(max_digits=12, decimal_places=5, default=0.0)

    def __str__(self):
        return f"{self.title} ({self.category.name})"

class FashionDesign(models.Model):
    title = models.CharField(max_length=200)
    sketch = models.ImageField(upload_to='fashion_designs/')
    notes = models.TextField(blank=True)
    designed_by = models.ForeignKey(Faculty, on_delete=models.SET_NULL, null=True, related_name='designs')
    created_at = models.DateTimeField(auto_now_add=True)
    is_minted = models.BooleanField(default=False)
    mint_address = models.CharField(max_length=200, blank=True, null=True)
    token_id = models.CharField(max_length=200, blank=True, null=True)
    price_eth = models.DecimalField(max_digits=12, decimal_places=5, default=0.0)

    def __str__(self):
        return f"Design: {self.title} by {self.designed_by.name if self.designed_by else 'Unknown'}"



class UpcomingExhibition(models.Model):
    title = models.CharField(max_length=200)
    date = models.CharField(max_length=100)
    image = models.ImageField(upload_to='upcoming_exhibitions/')
    description = models.TextField()

class FeaturedExhibition(models.Model):
    title = models.CharField(max_length=200)
    video = models.FileField(upload_to='featured_exhibitions/')
    description = models.TextField()

class Artwork(models.Model):
    SECTION_CHOICES = [
        ('featured', 'Featured'),
        ('trending', 'Trending'),
        ('upcoming', 'Upcoming'),
    ]

    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    image = models.ImageField(upload_to='artworks/')
    section = models.CharField(max_length=20, choices=SECTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    # --- Blockchain-related fields ---
    is_minted = models.BooleanField(default=False)
    blockchain = models.CharField(max_length=50, choices=[
        ('ethereum', 'Ethereum'),
        ('polygon', 'Polygon'),
        ('solana', 'Solana'),
        ('tezos', 'Tezos'),
    ], null=True, blank=True)
    token_id = models.CharField(max_length=255, null=True, blank=True)
    contract_address = models.CharField(max_length=255, null=True, blank=True)
    wallet_address = models.CharField(max_length=255, null=True, blank=True)
    tx_hash = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.title} by {self.artist}"