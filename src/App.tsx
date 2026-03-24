import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import PagesComponents from './pages/pages-components';
import LayoutMain from './pages/layout-main';
import Home from './pages/home';
import PhotoDetails from './pages/photo-details';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NuqsAdapter>
				<Toaster position='bottom-center'/>
				<BrowserRouter>
					<Routes>
						<Route element={<LayoutMain />}>
							<Route index element={<Home />} />
							<Route path='/fotos/:id' element={<PhotoDetails />} />
							<Route path='/components' element={<PagesComponents />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</NuqsAdapter>
		</QueryClientProvider>
	);
}