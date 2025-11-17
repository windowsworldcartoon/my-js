import {
  createExtensionContext,
  registerCommand,
  registerMenu,
  registerCommandMenu,
  executeCommand,
  showNotification,
  showProgress,
  registerWebview,
  updateWebview,
  registerActivityBar,
  removeWebview,
  showQuickPick,
  getSystemInfo,
} from '@windowsworldcartoon/codeinspector-extension-handler';


class MyJSExtension {
  constructor({ api, config, extensionPath }) {
    this.api = api;
    this.config = config;
    this.extensionPath = extensionPath;
    this.context = createExtensionContext({ api, config, extensionPath });
    this.state = {
      executionCount: 0,
      lastCommand: null,
      isActive: true
    };
    console.log('[my-js] Extension instance created');
  }

  async activate() {
    console.log('[my-js] Extension activated');
    
    // Register Webview
    this.registerWebview();
    
    // Register Activity Bar
    this.registerActivityBar();
    
    // Register core commands
    this.registerCoreCommands();
    
    // Register utility commands
    this.registerUtilityCommands();
    
    // Register main menu
    this.registerMainMenu();
    
    console.log('[my-js] Extension fully activated with all features');
  }

  // ==================== Webview Integration ====================
  registerWebview() {
    const webviewContent = `
      <div style="padding: 16px; background: #1e1e1e; color: #e0e0e0; font-family: 'Monaco', monospace; height: 100%; overflow-y: auto;">
        <h2 style="color: #007acc; margin-top: 0;">JavaScript Tools Dashboard</h2>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #4fc3f7; font-size: 14px;">Extension Statistics</h3>
          <div style="background: #252526; padding: 12px; border-radius: 4px; margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Commands Executed:</span>
              <strong id="execCount">0</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Last Command:</span>
              <strong id="lastCmd" style="color: #4ec9b0;">None</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Status:</span>
              <strong id="status" style="color: #238636;">Active</strong>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #4fc3f7; font-size: 14px;">Quick Actions</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
            <button onclick="alert('Format JS command executed')" style="padding: 8px 12px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">Format JavaScript</button>
            <button onclick="alert('Code Analysis command executed')" style="padding: 8px 12px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">Analyze Code</button>
            <button onclick="alert('Generate Docs command executed')" style="padding: 8px 12px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">Generate Docs</button>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 12px; background: #252526; border-left: 3px solid #007acc; border-radius: 4px;">
          <p style="margin: 0; font-size: 12px; color: #d4d4d4;">
            This extension provides JavaScript development tools including code formatting, analysis, and documentation generation.
          </p>
        </div>
      </div>
    `;
    
    registerWebview(this.context, 'my-js.webview', 'JS Tools', webviewContent);
    
    console.log('[my-js] Webview registered');
  }

  // ==================== Activity Bar Integration ====================
  registerActivityBar() {
    const activityBar = {
      id: 'my-js.activityBar',
      ext: 'my-js',
      title: 'JavaScript Tools',
      items: [
        {
          id: 'my-js.formatCode',
          label: 'Format Code',
          command: 'my-js.formatCode'
        },
        {
          id: 'my-js.analyzeCode',
          label: 'Analyze Code',
          command: 'my-js.analyzeCode'
        },
        {
          id: 'my-js.generateDocs',
          label: 'Generate Docs',
          command: 'my-js.generateDocs'
        }
      ]
    };
    
    registerActivityBar(this.context, activityBar);
    
    console.log('[my-js] Activity Bar registered');
  }

  // ==================== Core Commands ====================
  registerCoreCommands() {
    // Hello World command
    registerCommand(this.context, 'my-js.helloWorld', async (args) => {
      console.log('[my-js] helloWorld command executed', args);
      this.updateState('helloWorld');
      showNotification(this.context, 'Hello from JavaScript Extension!', 'info');
      return { success: true, message: 'Hello World executed' };
    });

    // Format Code command
    registerCommand(this.context, 'my-js.formatCode', async (args) => {
      console.log('[my-js] formatCode command executed', args);
      this.updateState('formatCode');
      
      const progress = showProgress(this.context, 'Formatting code...', true);
      
      // Simulate formatting
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification(this.context, 'Code formatted successfully', 'info');
      return { success: true, message: 'Code formatted' };
    });

    // Analyze Code command
    registerCommand(this.context, 'my-js.analyzeCode', async (args) => {
      console.log('[my-js] analyzeCode command executed', args);
      this.updateState('analyzeCode');
      
      const analysis = {
        issues: 2,
        warnings: 5,
        score: 85,
        timestamp: new Date().toISOString()
      };
      
      showNotification(this.context, `Analysis Complete: ${analysis.issues} issues, ${analysis.warnings} warnings`, 'info');
      return { success: true, data: analysis };
    });

    // Generate Documentation command
    registerCommand(this.context, 'my-js.generateDocs', async (args) => {
      console.log('[my-js] generateDocs command executed', args);
      this.updateState('generateDocs');
      
      const progress = showProgress(this.context, 'Generating documentation...', true);
      
      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification(this.context, 'Documentation generated successfully', 'info');
      return { success: true, message: 'Documentation created' };
    });
  }

  // ==================== Utility Commands ====================
  registerUtilityCommands() {
    // Get System Info command
    registerCommand(this.context, 'my-js.getSystemInfo', async (args) => {
      console.log('[my-js] getSystemInfo command executed');
      this.updateState('getSystemInfo');
      
      try {
        const systemInfo = getSystemInfo();
        console.log('[my-js] System info retrieved:', systemInfo);
        return { success: true, data: systemInfo };
      } catch (error) {
        console.error('[my-js] Failed to get system info:', error);
        return { success: false, error: error.message };
      }
    });

    // Show Quick Pick command
    registerCommand(this.context, 'my-js.showQuickPick', async (args) => {
      console.log('[my-js] showQuickPick command executed');
      this.updateState('showQuickPick');
      
      const items = [
        { label: 'Format Code', value: '1', description: 'Auto-format JavaScript code' },
        { label: 'Analyze Code', value: '2', description: 'Analyze code for issues' },
        { label: 'Generate Docs', value: '3', description: 'Generate JSDoc documentation' }
      ];
      
      showQuickPick(this.context, items, this.handleQuickPickSelection.bind(this));
      return { success: true };
    });

    // Extension Status command
    registerCommand(this.context, 'my-js.status', async (args) => {
      console.log('[my-js] status command executed');
      const status = {
        active: this.state.isActive,
        executionCount: this.state.executionCount,
        lastCommand: this.state.lastCommand,
        version: '1.0.0'
      };
      console.log('[my-js] Status:', status);
      return { success: true, data: status };
    });
  }

  // ==================== Menu Registration ====================
  registerMainMenu() {
    registerMenu(this.context, {
      id: 'my-js.mainMenu',
      label: 'JavaScript Tools',
      icon: 'circle',
      submenu: [
        {
          id: 'my-js.formatCode',
          type: 'button',
          label: 'Format Code',
          command: 'my-js.formatCode',
          icon: 'indent'
        },
        {
          id: 'my-js.analyzeCode',
          type: 'button',
          label: 'Analyze Code',
          command: 'my-js.analyzeCode',
          icon: 'search'
        },
        {
          id: 'my-js.generateDocs',
          type: 'button',
          label: 'Generate Documentation',
          command: 'my-js.generateDocs',
          icon: 'file'
        },
        {
          id: 'my-js.separator1',
          type: 'separator'
        },
        {
          id: 'my-js.quickPick',
          type: 'button',
          label: 'Quick Actions',
          command: 'my-js.showQuickPick',
          icon: 'zap'
        },
        {
          id: 'my-js.status',
          type: 'button',
          label: 'Show Status',
          command: 'my-js.status',
          icon: 'info'
        }
      ]
    });
  }

  // ==================== Utility Methods ====================
  updateState(commandName) {
    this.state.executionCount++;
    this.state.lastCommand = commandName;
    console.log(`[my-js] State updated: ${commandName} (Count: ${this.state.executionCount})`);
  }

  handleQuickPickSelection(selectedItem) {
    console.log('[my-js] Handling selection:', selectedItem);
    
    const messages = {
      '1': 'Starting code formatting...',
      '2': 'Starting code analysis...',
      '3': 'Starting documentation generation...'
    };
    
    const message = messages[selectedItem.value] || 'Action selected';
    showNotification(this.context, message, 'info');
  }

  deactivate() {
    console.log('[my-js] Extension deactivating');
    this.state.isActive = false;
    removeWebview(this.context, 'my-js.webview');
    console.log('[my-js] Extension deactivated');
  }
}

export default MyJSExtension;

