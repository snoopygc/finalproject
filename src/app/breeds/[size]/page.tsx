'use client'

import { useParams } from 'next/navigation'
import BreedCard from '@/components/BreedCard'

const breeds = {
    small: [
        { name: 'บาเซนจิ', englishName: 'Basenji', image: 'Basenji.png' },
        { name: 'บีเกิ้ล', englishName: 'Beagle', image: 'Beagle.jpg' },
        { name: 'บิชอง ฟริเซ่', englishName: 'Bichon Frise', image: 'BichonFrise.jpeg' },
        { name: 'โบโลเนส', englishName: 'Bolognese', image: 'Bolognese.jpg' },
        { name: 'คาวาเลียร์ คิง ชาลส์ สแปเนียล', englishName: 'Cavalier King Charles Spaniel', image: 'CavalierKingCharlesSpaniel.jpg' },
        { name: 'ชิวาวา', englishName: 'Chihuahua', image: 'Chihuahua.jpg' },
        { name: 'ดัชชุน', englishName: 'Dachshund', image: 'Dachshund.png' },
        { name: 'เฟรนช์ บูลด็อก', englishName: 'French Bulldog', image: 'FrenchBulldog.jpg' },
        { name: 'อิตาเลียน เกรย์ฮาวด์', englishName: 'Italian Greyhound', image: 'ItalianGreyhound.jpg' },
        { name: 'แจ็ค รัสเซลล์ เทอร์เรีย', englishName: 'Jack Russell Terrier', image: 'JackRussellTerrier.jpg' },
        { name: 'เจแปนีส สปิตซ์', englishName: 'Japanese Spitz', image: 'JapaneseSpitz.jpg' },
        { name: 'ลาซา แอพโช', englishName: 'Lhasa Apso', image: 'LhasaApso.jpg' },
        { name: 'มอลทีส', englishName: 'Maltese', image: 'Maltese.png' },
        { name: 'แมนเชสเตอร์ เทอร์เรียร์', englishName: 'Manchester Terrier', image: 'ManchesterTerrier.jpeg' },
        { name: 'ชเนาเซอร์ขนาดเล็ก', englishName: 'Miniature Schnauzer', image: 'MiniatureSchnauzer.jpg' },
        { name: 'ปาปิญอง', englishName: 'Papillon', image: 'Papillon.jpg' },
        { name: 'ปักกิ่ง', englishName: 'Pekingese', image: 'Pekingese.jpg' },
        { name: 'เพมโบรก เวลช์ คอร์กี้', englishName: 'Pembroke Welsh Corgi', image: 'PembrokeWelshCorgi.jpg' },
        { name: 'ปอมเมอเรเนียน', englishName: 'Pomeranian', image: 'Pomeranian.jpg' },
        { name: 'พุดเดิ้ล', englishName: 'Poodle (Miniature)', image: 'Poodle.jpeg' },
        { name: 'ปั๊ก', englishName: 'Pug', image: 'Pug.jpg' },
        { name: 'เชทแลนด์ ชีพด็อก', englishName: 'Shetland Sheepdog', image: 'ShetlandSheepdog.jpg' },
        { name: 'ชิบะ อินุ', englishName: 'Shiba Inu', image: 'ShibaInu.jpg' },
        { name: 'ชิสุห์', englishName: 'Shih Tzu', image: 'ShihTzu.jpg' },
        { name: 'เวลช์ เทอร์เรีย', englishName: 'Welsh Terrier', image: 'WelshTerrier.jpg' },
        { name: 'ยอร์กเชียร์ เทอร์เรียร์', englishName: 'Yorkshire Terrier', image: 'YorkshireTerrier.jpg' },
    ],
    medium: [
        { name: 'แบสเซ็ต ฮาวด์', englishName: 'Basset Hound', image: 'BassetHound.jpg' },
        { name: 'บอร์เดอร์ คอลลี่', englishName: 'Border Collie', image: 'BorderCollie.jpg' },
        { name: 'บูลเทอร์เรีย', englishName: 'Bull Terrier', image: 'BullTerrier.jpg' },
        { name: 'บูลด็อก', englishName: 'Bulldog', image: 'Bulldog.jpg' },
        { name: 'เชา เชา', englishName: 'Chow Chow', image: 'ChowChow.jpg' },
        { name: 'ค็อกเกอร์ สแปเนียล', englishName: 'Cocker Spaniel', image: 'CockerSpaniel.jpg' },
        { name: 'คอลลี่', englishName: 'Collie', image: 'Collie.jpg' },
        { name: 'ดัลเมเชียน', englishName: 'Dalmatian', image: 'Dalmatian.jpg' },
        { name: 'เดรเวอร์', englishName: 'Drever', image: 'Drever.jpg' },
        { name: 'มูดิ', englishName: 'Mudi', image: 'Mudi.jpg' },
        { name: 'พิตบูล', englishName: 'Pitbull', image: 'Pitbull.jpg' },
        { name: 'ซามอยด์', englishName: 'Samoyed', image: 'Samoyed.jpg' },
        { name: 'ไซบีเรียน ฮัสกี', englishName: 'Siberian Husky', image: 'SiberianHusky.jpg' },
        { name: 'ชเนาเซอร์', englishName: 'Schnauzer', image: 'Schnauzer.jpg' },
        { name: 'บางแก้ว', englishName: 'Thai Bangkaew', image: 'ThaiBangkaew.jpg' },
        { name: 'ไทยหลังอาน', englishName: 'Thai Ridgeback', image: 'ThaiRidgeback.jpg' },
    ],
    large: [
        { name: 'อัฟกัน ฮาวด์', englishName: 'Afghan Hound', image: 'AfghanHound.jpg' },
        { name: 'อะกิตะ อินุ', englishName: 'Akita Inu', image: 'AkitaInu.jpg' },
        { name: 'อลาสกัน มาลามิวท์', englishName: 'Alaskan Malamute', image: 'AlaskanMalamute.jpg' },
        { name: 'เบอร์นีส เมาน์เทนด็อก', englishName: 'Bernese Mountain Dog', image: 'BerneseMountainDog.jpg' },
        { name: 'บอร์ซอย', englishName: 'Borzoi', image: 'Borzoi.jpg' },
        { name: 'บ็อกเซอร์', englishName: 'Boxer', image: 'Boxer.jpg' },
        { name: 'โดเบอร์แมน', englishName: 'Doberman', image: 'Doberman.jpg' },
        { name: 'เยอรมัน เชพเพิร์ด', englishName: 'German Shepherd', image: 'GermanShepherd.jpg' },
        { name: 'โกลเด้น รีทริฟเวอร์', englishName: 'Golden Retriever', image: 'GoldenRetriever.jpg' },
        { name: 'เกรทเดน', englishName: 'Great Dane', image: 'GreatDane.jpg' },
        { name: 'เกรย์ฮาวนด์', englishName: 'Greyhound', image: 'Greyhound.jpg' },
        { name: 'ลาบราดอร์ รีทริฟเวอร์', englishName: 'Labrador Retriever', image: 'LabradorRetriever.jpg' },
        { name: 'แลนด์เซียร์', englishName: 'Landseer', image: 'Landseer.jpg' },
        { name: 'มาสทิฟฟ์', englishName: 'Mastiff', image: 'Mastiff.jpg' },
        { name: 'นิวฟาวด์แลนด์', englishName: 'Newfoundland', image: 'Newfoundland.jpg' },
        { name: 'ร็อตไวเลอร์', englishName: 'Rottweiler', image: 'Rottweiler.jpg' },
        { name: 'เซนต์ เบอร์นาร์ด', englishName: 'Saint Bernard', image: 'SaintBernard.jpg' },
    ],
}

export default function BreedsPage() {
    const params = useParams()
    const size = params.size as 'small' | 'medium' | 'large'

    if (!['small', 'medium', 'large'].includes(size)) {
        return <div>Invalid size</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{size.charAt(0).toUpperCase() + size.slice(1)} Dog Breeds</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {breeds[size].map((breed) => (
                    <BreedCard
                        key={breed.englishName}
                        name={breed.name}
                        englishName={breed.englishName}
                        image={breed.image}
                        size={size}
                    />
                ))}
            </div>
        </div>
    )
}

