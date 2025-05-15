from rest_framework import viewsets, permissions
from .models import Faculty, Gallery, FashionItem, FashionDesign, UpcomingExhibition, FeaturedExhibition
from .serializers import FacultySerializer, GallerySerializer, FashionItemSerializer, FashionDesignSerializer, UpcomingExhibitionSerializer, FeaturedExhibitionSerializer
from .models import UpcomingExhibition, FeaturedExhibition
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Artwork


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [permissions.AllowAny]

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    permission_classes = [permissions.AllowAny]

class UpcomingExhibitionViewSet(viewsets.ModelViewSet):
    queryset = UpcomingExhibition.objects.all()
    serializer_class = UpcomingExhibitionSerializer




def artworks_data(request):
    featured = list(Artwork.objects.filter(category='featured').values())
    trending = list(Artwork.objects.filter(category='trending').values())
    upcoming = list(Artwork.objects.filter(category='upcoming').values())

    return JsonResponse({
        'featured': featured,
        'trending': trending,
        'upcoming': upcoming
    })


def trending_artworks(request):
    # Your logic to fetch and return trending artworks
    return JsonResponse({"trending": trending_artworks_data})


class FeaturedExhibitionViewSet(viewsets.ModelViewSet):
    queryset = FeaturedExhibition.objects.all()
    serializer_class = FeaturedExhibitionSerializer

class FashionItemViewSet(viewsets.ModelViewSet):
    queryset = FashionItem.objects.all()
    serializer_class = FashionItemSerializer
    permission_classes = [permissions.AllowAny]

class FashionDesignViewSet(viewsets.ModelViewSet):
    queryset = FashionDesign.objects.all()
    serializer_class = FashionDesignSerializer
    permission_classes = [permissions.AllowAny]


class ExhibitionListView(APIView):
    def get(self, request):
        upcoming = UpcomingExhibition.objects.all()
        featured = FeaturedExhibition.objects.all()

        upcoming_serializer = UpcomingExhibitionSerializer(upcoming, many=True)
        featured_serializer = FeaturedExhibitionSerializer(featured, many=True)

        return Response({
            "upcoming": upcoming_serializer.data,
            "featured": featured_serializer.data
        })


