
export interface Photo {
  id: string;
  url: string;
  title: string;
  category: 'Archaic Terrains' | 'Lichened Geometry' | 'The Vespertine Hour';
  metadata: {
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
}

export type Category = 'All' | 'Archaic Terrains' | 'Lichened Geometry' | 'The Vespertine Hour';
