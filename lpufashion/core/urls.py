from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FacultyViewSet, GalleryViewSet, FashionItemViewSet, FashionDesignViewSet,
    UpcomingExhibitionViewSet, FeaturedExhibitionViewSet, artworks_data, trending_artworks
)

from .views import ExhibitionListView


router = DefaultRouter()
router.register(r'faculty', FacultyViewSet)
router.register(r'gallery', GalleryViewSet)
router.register(r'upcoming-exhibitions', UpcomingExhibitionViewSet)
router.register(r'featured-exhibitions', FeaturedExhibitionViewSet)
router.register(r'fashion-items', FashionItemViewSet)
router.register(r'fashion-designs', FashionDesignViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/exhibitions/', ExhibitionListView.as_view(), name='exhibition-list'),
    path('api/artworks/', artworks_data, name='artworks-data'),
    path('api/trending-artworks/', trending_artworks, name='trending_artworks'),
]
