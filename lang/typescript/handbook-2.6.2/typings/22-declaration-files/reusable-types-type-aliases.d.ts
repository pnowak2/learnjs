type GreetingLike = string | (() => string) | Greeter;

declare function greet(g: GreetingLike): void;