import * as code from '@codeinspector/extension-handler'
import path from 'path';
import fs from 'fs';

export function activate(api, config, extensionPath) {
  console.log('🟢 my-js extension activating');
  const context = code.createExtensionContext({
    api,
    config,
    extensionPath
  });

  // Register a command
  console.log('Registering my-js.hello command');
  code.registerCommand(context, 'my-js.hello', () => {
    
    code.showProgress(context, 'MyJs', 'Hello, World!');
    setTimeout(() => {
      code.hideProgress(context); 
      code.showNotification(context, {
        title: 'MyJs',
        message: 'Hello, World!',
        type: 'success'
      });
    }, 10000);
    return { status: 'success' };
  }, {
    title: 'MyJs',
    description: 'A simple extension to demonstrate the extension handler',
    category: 'MyJs'
  });

  // Register reload extensions command
  console.log('Registering extensions.reload command');
  code.registerCommand(context, 'extensions.reload', async () => {
    code.showProgress(context, 'Extensions', 'Reloading extensions...');
    try {
      const result = await api.reloadExtensions();
      code.hideProgress(context);
      code.showNotification(context, {
        title: 'Extensions',
        message: `Reloaded ${result.count} extension(s)`,
        type: 'success'
      });
      return result;
    } catch (error) {
      code.hideProgress(context);
      code.showNotification(context, {
        title: 'Extensions',
        message: `Failed to reload: ${error.message}`,
        type: 'error'
      });
      throw error;
    }
  }, {
    title: 'Reload Extensions',
    description: 'Reload all active extensions',
    category: 'Extensions'
  });

  // Register activity bar
  console.log('🟢 Registering activity bar');
  code.registerActivityBar(context, 'my-js', 'my-js', path.join(extensionPath, 'icon.svg'), 'MyJs', 'my-js.webview');
  console.log('✅ Activity bar registration call completed');

  // Register a custom menu
  console.log('🟢 Registering custom menu');
  code.registerMenu(context, {
    id: 'my-js',
    label: 'MyJs',
    submenu: [
      {
        id: 'my-js.run-command',
        label: 'Run Command',
        accelerator: 'Ctrl+Shift+M'
      },
      {
        id: 'my-js.open-settings',
        label: 'Open Settings',
        accelerator: 'Ctrl+Shift+,'
      },
      {
        type: 'separator'
      },
      {
        id: 'my-js.about',
        label: 'About MyJs'
      }
    ]
  });
  console.log('✅ Menu registration call completed');

  // Listen for menu item clicks via IPC
  if (api.on) {
    api.on('menu-item-clicked', (data) => {
      console.log('Menu item clicked:', data.id);
      
      switch(data.id) {
        case 'my-js.run-command':
          console.log('MyJs: Run Command clicked');
          code.showNotification(context, {
            title: 'MyJs',
            message: 'Run Command executed!',
            type: 'success'
          });
          break;
        
        case 'my-js.open-settings':
          console.log('MyJs: Open Settings clicked');
          code.showNotification(context, {
            title: 'MyJs',
            message: 'Opening settings...',
            type: 'info'
          });
          break;
        
        case 'my-js.about':
          console.log('MyJs: About clicked');
          code.showNotification(context, {
            title: 'MyJs Extension',
            message: 'A simple extension to demonstrate the extension handler. Version: ' + config.version,
            type: 'info'
          });
          break;
      }
    });
  }

  // Load and register webview
  try {
    const webviewPath = path.join(String(extensionPath).replace('index.js', ''), 'webview.html');
    if (fs.existsSync(webviewPath)) {
      code.showNotification(context, {
        title: 'MyJs',
        message: 'Webview loaded successfully!',
        type: 'success'
      });
      const htmlContent = fs.readFileSync(webviewPath, 'utf8');
      code.registerWebview(context, 'my-js.webview', 'MyJs Webview', htmlContent);
      console.log('Webview registered successfully');
    } else {
      console.warn(`Webview file not found at: ${webviewPath}`);
    }
  } catch (error) {
    console.error('Failed to load webview:', error.message);
  }
}

export function deactivate() {
  // Cleanup code here if needed
}