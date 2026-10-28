import CartDrawer from './CartDrawer';
import { useCart } from '../Contexts/CartContext';

export default function StoreCart() { const cart = useCart(); return <CartDrawer items={cart.items} open={cart.open} close={cart.closeCart} change={cart.change} remove={cart.remove} />; }
