import { Property } from '../../types/property';
import PropertyCard from './PropertyCard';
import styles from './PropertyGrid.module.css';

/**
 * Component that renders a responsive grid layout for properties.
 * Iterates through a list of properties and displays a PropertyCard for each.
 * 
 * @param {Object} props - The component props.
 * @param {Property[]} props.properties - An array of property objects to display in the grid.
 * @returns {JSX.Element} The rendered property grid component.
 */
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