import { Ionicons } from '@expo/vector-icons';

export default function Icons({ icon, color, size, style }) {
  return <Ionicons name={icon} size={size} color={color} style={style} />;
}
