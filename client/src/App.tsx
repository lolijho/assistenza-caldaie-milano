import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Vaillant from "./pages/Vaillant";
import Baxi from "./pages/Baxi";
import Junkers from "./pages/Junkers";
import Sylber from "./pages/Sylber";
import Blog from "./pages/Blog";
import BlogArticle1 from "./pages/BlogArticle1";
import Admin from "./pages/Admin";
import AdminPages from "./pages/AdminPages";
import AdminBlog from "./pages/AdminBlog";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/vaillant" component={Vaillant} />
      <Route path="/baxi" component={Baxi} />
      <Route path="/junkers" component={Junkers} />
      <Route path="/sylber" component={Sylber} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/come-scegliere-centro-assistenza-caldaie-milano" component={BlogArticle1} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/pages" component={AdminPages} />
      <Route path="/admin/blog" component={AdminBlog} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
