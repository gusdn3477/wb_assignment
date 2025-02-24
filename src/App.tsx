import Router from './Router';
import AuthProvider from './provider/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
