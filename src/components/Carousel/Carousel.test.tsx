import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

const mockPictures = [
  'https://s3-s1.kasa.fr/image1.jpg',
  'https://s3-s1.kasa.fr/image2.jpg',
  'https://s3-s1.kasa.fr/image3.jpg',
];

describe('Carousel Component', () => {
  const mockOnClose = jest.fn();

  test('renders initial image and default counter display', () => {
    render(
      <Carousel 
        pictures={mockPictures} 
        initialIndex={0} 
        onClose={mockOnClose} 
      />
    );
    
    // Check if counter matches pattern "1 / 3" regardless of whitespace
    expect(screen.getByText(/1\s*\/\s*3/)).toBeInTheDocument();
  });

  test('navigates to next image on right arrow click', () => {
    render(
      <Carousel 
        pictures={mockPictures} 
        initialIndex={0} 
        onClose={mockOnClose} 
      />
    );
    
    // Trigger click on next button by aria-label
    const nextButton = screen.getByRole('button', { name: 'Image suivante' });
    fireEvent.click(nextButton);

    // Verify counter updates to index 2
    expect(screen.getByText(/2\s*\/\s*3/)).toBeInTheDocument();
  });

  test('loops to last image on left arrow click from first image', () => {
    render(
      <Carousel 
        pictures={mockPictures} 
        initialIndex={0} 
        onClose={mockOnClose} 
      />
    );
    
    // Trigger click on previous button
    const prevButton = screen.getByRole('button', { name: 'Image précédente' });
    fireEvent.click(prevButton);

    // Verify counter loops back to the end (3/3)
    expect(screen.getByText(/3\s*\/\s*3/)).toBeInTheDocument();
  });

  test('calls onClose handler when clicking close button', () => {
    render(
      <Carousel 
        pictures={mockPictures} 
        initialIndex={0} 
        onClose={mockOnClose} 
      />
    );
    
    // Trigger close modal action
    const closeButton = screen.getByRole('button', { name: 'Fermer la galerie' });
    fireEvent.click(closeButton);

    // Assert callback execution
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});