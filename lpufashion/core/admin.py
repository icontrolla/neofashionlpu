from django.contrib import admin
from .models import (
    Faculty, Gallery,
    FashionCategory, FashionItem, FashionDesign,
    UpcomingExhibition, FeaturedExhibition, Artwork
)

@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation')
    search_fields = ('name', 'designation')

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')
    search_fields = ('title',)

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'section', 'is_minted', 'blockchain', 'created_at')
    list_filter = ('section', 'blockchain', 'is_minted')

@admin.register(FashionCategory)
class FashionCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(FashionItem)
class FashionItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'subcategory', 'price_eth', 'is_minted')
    list_filter = ('category', 'subcategory', 'is_minted')
    search_fields = ('title', 'category__name')

@admin.register(FashionDesign)
class FashionDesignAdmin(admin.ModelAdmin):
    list_display = ('title', 'designed_by', 'created_at', 'is_minted')
    list_filter = ('created_at', 'is_minted')
    search_fields = ('title', 'designed_by__name')

@admin.register(UpcomingExhibition)
class UpcomingExhibitionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    search_fields = ('title',)

@admin.register(FeaturedExhibition)
class FeaturedExhibitionAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)
