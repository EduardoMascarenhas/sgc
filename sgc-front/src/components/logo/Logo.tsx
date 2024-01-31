import LogoLarge from "./components/LogoLarge";
import LogoSmall from "./components/LogoSmall";

interface Params {
    size: 'S' | 'L';
}

const Logo = ({ size }: Params) => {
    return (
        size === 'S' ? <LogoSmall /> : <LogoLarge />
    )
}

export default Logo;