from rest_framework import serializers
from .models import Faculty, Gallery, FashionItem, FashionDesign, FashionCategory, UpcomingExhibition, FeaturedExhibition, Artwork

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = [
            'id', 'title', 'artist', 'image', 'section',
            'is_minted', 'blockchain', 'token_id',
            'contract_address', 'wallet_address', 'tx_hash'
        ]



class FashionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FashionItem
        fields = [
            'id',
            'title',
            'image',
            'category',
            'description',
            'uploaded_at',
            'is_minted',
            'mint_address',
            'token_id',
            'price_eth'
        ]

class FashionCategorySerializer(serializers.ModelSerializer):
    items = FashionItemSerializer(many=True)

    class Meta:
        model = FashionCategory
        fields = ['name', 'description', 'items']

class FashionDesignSerializer(serializers.ModelSerializer):
    designed_by_name = serializers.CharField(source='designed_by.name', read_only=True)

    class Meta:
        model = FashionDesign
        fields = [
            'id',
            'title',
            'sketch',
            'notes',
            'designed_by',
            'designed_by_name',
            'created_at',
            'is_minted',
            'mint_address',
            'token_id',
            'price_eth'
        ]

class UpcomingExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpcomingExhibition
        fields = '__all__'

class FeaturedExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedExhibition
        fields = '__all__'