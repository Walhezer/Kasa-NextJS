import { Property } from '../../types/property';
import PropertyCard from './PropertyCard';
import styles from './PropertyGrid.module.css';


interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <section className={styles.gridContainer}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}