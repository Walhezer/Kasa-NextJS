import styles from './DescriptionCard.module.css';
import { LocationIcon } from "../../components/Icons";

/**
 * Component displaying the main details of a property, including title, location, description, equipments, and tags.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The full title of the property.
 * @param {string} props.location - The geographical location of the property.
 * @param {string} props.description - A detailed text describing the property.
 * @param {string[]} props.equipments - List of equipments available (e.g., WiFi, Kitchen).
 * @param {string[]} props.tags - List of tags or categories associated with the property.
 * @returns {JSX.Element} The rendered description card component.
 */
interface DescriptionCardProps {
    title: string;
    location: string;
    description: string;
    equipments: string[];
    tags: string[];
}

export default function DescriptionCard({
    title,
    location,
    description,
    equipments,
    tags
}: DescriptionCardProps) {
    const cleanTitle = title.split(' - ')[0];

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>{cleanTitle}</h1>

            <p className={styles.location}>
                <LocationIcon className={styles.pin} /> {location}
            </p>

            <p className={styles.description}>{description}</p>

            {equipments && equipments.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Équipements</h3>
                    <div className={styles.badgesContainer}>
                        {equipments.map((eq, index) => (
                            <span key={index} className={styles.badge}>{eq}</span>
                        ))}
                    </div>
                </div>
            )}

            {tags && tags.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Catégorie</h3>
                    <div className={styles.badgesContainer}>
                        {tags.map((tag, index) => (
                            <span key={index} className={styles.badge}>{tag}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}