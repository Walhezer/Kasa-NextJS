import { renderHook, act } from '@testing-library/react';
import { useFavorites, FavoritesProvider } from './FavoritesContext';

// 1. We create a “fake” localStorage (a mock) so that Jest can simulate the browser
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

// We replace the actual localStorage in the test environment with our mock
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Hook useFavorites (avec Context)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('devrait initialiser avec un tableau de favoris vide par défaut', () => {
    // We add the “wrapper” to provide context to the hook during the test
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });
    
    expect(result.current.favorites).toEqual([]);
  });

  it('devrait ajouter un ID aux favoris et le sauvegarder dans le localStorage', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });
    const testId = 'logement-123';

    act(() => {
      result.current.toggleFavorite(testId);
    });

    expect(result.current.favorites).toEqual([testId]);
    expect(window.localStorage.getItem('kasa-favorites')).toEqual(JSON.stringify([testId]));
  });

  it('devrait retirer un ID des favoris si on clique une deuxième fois', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });
    const testId = 'logement-123';
    
    act(() => {
      result.current.toggleFavorite(testId);
    });
    
    act(() => {
      result.current.toggleFavorite(testId);
    });

    expect(result.current.favorites).toEqual([]);
    expect(window.localStorage.getItem('kasa-favorites')).toEqual(JSON.stringify([]));
  });
});