import { Metadata } from 'next';
import PortfolioContent from './portfolio-content';

export const metadata: Metadata = {
    title: "Selected Works | Hookkapaani Studio",
    description: "Browse our collection of kinetic sculptures, installations, and mechanical art pieces.",
};

export default function PortfolioPage() {
    return <PortfolioContent />;
}
