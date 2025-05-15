import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(to bottom right, #FF6B00, #1F1F1F);
  min-height: 100vh;
  display: flex;
  margin-top: -20vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 40px 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.5rem;
    margin-top: -12.5rem;
  }
`;

const Heading = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 3.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: white;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subheading = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  margin-top: 20px;
  color: #FFF6F0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const ShopButton = styled(motion.button)`
  padding: 12px 25px;
  background-color: #FF6B00;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  margin-top: 30px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    background-color: white;
    color: #FF6B00;
    transform: scale(1.05);
    border: 2px solid #FF6B00;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
`;

// Artworks Section
const ArtworksSection = styled.section`
  padding: 60px 20px;
  background-color: white;
`;

const ArtworksHeading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 40px;
  color: #1F1F1F;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArtworkCard = styled.div`
  background-color: #FFF6F0;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(255, 107, 0, 0.3);
  }
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ArtworkInfo = styled.div`
  padding: 20px;
`;

const ArtworkTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  margin: 0 0 10px;
  color: #1F1F1F;
`;

const ArtistName = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #FF6B00;
  margin: 0;
`;

// Sticky Header
const Header = styled.header`
  position: sticky;
  top: 10px;
  background-color: #1F1F1F;
  color: white;
  z-index: 1000;
  padding: 10px 20px;
  margin: 0 15px;

  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.5rem;
    text-align: center;
  }
`;

const Nav = styled.nav``;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  padding-left: 0;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 500;

  &:hover {
    color: #FF6B00;
  }
`;

const HomePage = () => {
  const [trendingArtworks, setTrendingArtworks] = useState([]);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [upcomingArtworks, setUpcomingArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/artworks/")
      .then(res => res.json())
      .then(data => {
        setFeaturedArtworks(data.featured || []);
        setTrendingArtworks(data.trending || []);
        setUpcomingArtworks(data.upcoming || []);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to load artworks.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <Header>
        <div style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>NEO Fashion</div>
        <Nav>
          <NavList>
            <NavItem><NavLink href="/gallery">Gallery</NavLink></NavItem>
            <NavItem><NavLink href="/exhibitions">Exhibitions</NavLink></NavItem>
            <NavItem><NavLink href="/about">About</NavLink></NavItem>
            <NavItem><NavLink href="#contact">Contact</NavLink></NavItem>
          </NavList>
        </Nav>
      </Header>

      {/* Hero Section */}
      <HeroSection>
        <div>
          <Heading>NEO LPU Fashion</Heading>
          <Subheading>Explore exclusive designs with a cinematic touch.</Subheading>
          <ShopButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            Explore Masterpieces
          </ShopButton>
        </div>
      </HeroSection>

      {/* Featured Designs */}
      <ArtworksSection>
        <ArtworksHeading>Featured Designs</ArtworksHeading>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading designs...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : featuredArtworks.length === 0 ? (
          <p style={{ textAlign: "center" }}>No featured designs available.</p>
        ) : (
          <ArtworkGrid>
            {featuredArtworks.map(artwork => (
              <ArtworkCard key={artwork.id}>
                <ArtworkImage src={artwork.image} alt={artwork.title} />
                <ArtworkInfo>
                  <ArtworkTitle>{artwork.title}</ArtworkTitle>
                  <ArtistName>by {artwork.artist}</ArtistName>
                </ArtworkInfo>
              </ArtworkCard>
            ))}
          </ArtworkGrid>
        )}
      </ArtworksSection>

      {/* Trending Designs */}
      <ArtworksSection>
        <ArtworksHeading>Trending Designs</ArtworksHeading>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading designs...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : trendingArtworks.length === 0 ? (
          <p style={{ textAlign: "center" }}>No trending designs available.</p>
        ) : (
          <ArtworkGrid>
            {trendingArtworks.map(artwork => (
              <ArtworkCard key={artwork.id}>
                <ArtworkImage src={artwork.image} alt={artwork.title} />
                <ArtworkInfo>
                  <ArtworkTitle>{artwork.title}</ArtworkTitle>
                  <ArtistName>by {artwork.artist}</ArtistName>
                </ArtworkInfo>
              </ArtworkCard>
            ))}
          </ArtworkGrid>
        )}
      </ArtworksSection>

      {/* Upcoming Designs */}
      <ArtworksSection>
        <ArtworksHeading>Upcoming Designs</ArtworksHeading>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading designs...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : upcomingArtworks.length === 0 ? (
          <p style={{ textAlign: "center" }}>No upcoming designs available.</p>
        ) : (
          <ArtworkGrid>
            {upcomingArtworks.map(artwork => (
              <ArtworkCard key={artwork.id}>
                <ArtworkImage src={artwork.image} alt={artwork.title} />
                <ArtworkInfo>
                  <ArtworkTitle>{artwork.title}</ArtworkTitle>
                  <ArtistName>by {artwork.artist}</ArtistName>
                </ArtworkInfo>
              </ArtworkCard>
            ))}
          </ArtworkGrid>
        )}
      </ArtworksSection>
    </>
  );
};

export default HomePage;
