# Web Components Library

A modern collection of reusable, customizable web components built with vanilla JavaScript. This library focuses on providing lightweight, performant, and easy-to-use components that can be integrated into any web project.

## Components

### ImgLazy

A lazy-loading image component that improves page performance by loading images only when they enter the viewport.

#### Features

- Lazy loads images using Intersection Observer API
- Automatically handles attribute changes
- Cleans up resources when disconnected
- Supports all standard img attributes
- Zero dependencies

#### Installation

1. Copy the component file into your project:

```javascript
// ImgLazy/ImgLazy.js
class ImgLazy extends HTMLElement {
  // ... (component code)
}
```

2. Import the component in your HTML:

```html
<script src="path/to/ImgLazy.js"></script>
```

#### Usage

```html
<!-- Basic usage -->
<img-lazy src="path/to/image.jpg" alt="Description"></img-lazy>

<!-- With additional attributes -->
<img-lazy src="path/to/image.jpg" alt="Description" title="Image title" class="my-image"></img-lazy>
```

#### Attributes

The component supports all standard `<img>` attributes:

- `src` (required): Path to the image
- `alt`: Alternative text for the image
- `title`: Title for the image
- `class`: CSS classes
- And any other valid img attribute

## Browser Support

This library uses modern web technologies and APIs. It's compatible with all modern browsers that support:

- Custom Elements v1
- Intersection Observer API
- MutationObserver API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - feel free to use this in your projects!
