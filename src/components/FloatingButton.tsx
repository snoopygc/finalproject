'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './FloatingButton.module.css';

const FloatingButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={styles.floatingContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.floatingButton}>+</div>
            <div className={`${styles.elementContainer} ${isHovered ? styles.showElements : ''}`}>
                <Link href="/breeds/small" className={`${styles.floatElementWrapper} ${styles.wrapper1}`}>
                    <span className={`${styles.floatElement} ${styles.element1}`}>
                        🦴
                    </span>
                    <div className={styles.floatElementText}>Small Breeds</div>
                </Link>
                <Link href="/breeds/medium" className={`${styles.floatElementWrapper} ${styles.wrapper2}`}>
                    <span className={`${styles.floatElement} ${styles.element2}`}>
                        🐶
                    </span>
                    <div className={styles.floatElementText}>Medium Breeds</div>
                </Link>
                <Link href="/breeds/large" className={`${styles.floatElementWrapper} ${styles.wrapper3}`}>
                    <span className={`${styles.floatElement} ${styles.element3}`}>
                        🦮
                    </span>
                    <div className={styles.floatElementText}>Big Breeds</div>
                </Link>
            </div>
        </div>

    );
};

export default FloatingButton;
