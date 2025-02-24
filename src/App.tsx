import Router from './Router';
import ErrorModal from './components/ErrorModal';
import AuthProvider from './provider/AuthProvider';
import { useModalStore } from './store/useModalStore';

export default function App() {
  const modalVisible = useModalStore((state) => state.visible.error);
  const handleModalClose = useModalStore((state) => state.handleClose);

  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <ErrorModal
        open={modalVisible}
        onClose={() => {
          handleModalClose('error');
        }}
      />
    </>
  );
}
