declare namespace GreetingLib {
  interface LogOptions {
      verbose?: boolean;
  }
  interface AlertOptions {
      modal: boolean;
      title?: string;
      color?: string;
  }
}

// You can also create nested namespaces in one declaration:
declare namespace GreetingLib.Options {
  // Refer to via GreetingLib.Options.Log
  interface Log {
      verbose?: boolean;
  }
  interface Alert {
      modal: boolean;
      title?: string;
      color?: string;
  }
}