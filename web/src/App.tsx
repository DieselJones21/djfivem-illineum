import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';
import Nui from './Nui';
import { useCallback, useEffect, useState } from 'react';
import { envyThemeLua } from './theme/envy';
import { bootPreview, isPreview, registerPreviewMocks } from './preview';

if (isPreview()) {
  registerPreviewMocks();
}

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(envyThemeLua);

  const getCurrentTheme = (themeData: any) => {
    if (!themeData?.themes) return envyThemeLua;
    for (let index = 0; index < themeData.themes.length; index++) {
      if (themeData.themes[index].id === themeData.currentTheme) {
        return themeData.themes[index];
      }
    }
    return envyThemeLua;
  };

  const loadTheme = useCallback(async () => {
    const themeData = await Nui.post('get_theme_configuration');
    if (themeData) {
      setCurrentTheme(getCurrentTheme(themeData));
    }
  }, []);

  useEffect(() => {
    loadTheme().catch(console.error);
    if (isPreview()) {
      bootPreview();
    }
  }, [loadTheme]);

  return (
    <NuiStateProvider>
      <ThemeProvider theme={currentTheme || envyThemeLua}>
        <Appearance />
        <GlobalStyles />
      </ThemeProvider>
    </NuiStateProvider>
  );
};

export default App;
