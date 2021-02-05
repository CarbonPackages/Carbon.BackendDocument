[![Latest stable version]][packagist] [![Total downloads]][packagist] [![License]][packagist] [![GitHub forks]][fork] [![GitHub stars]][stargazers] [![GitHub watchers]][subscription]

# Carbon.BackendDocument Package for Neos CMS

Two small Fusion prototypes to create nice only-backend documents.

| Version | Neos          | Maintained |
| ------- | ------------- | :--------: |
| 1.\*    | 3.3.\* - 5.\* |     ✗      |
| 2.\*    | 4.\* - 5.\*   |     ✗      |
| 3.\*    | 7.\*          |     ✗      |
| 4.\*    | 4.3.\* - 5.\* |     ✓      |
| 5.\*    | 7.\*          |     ✓      |

## Installation

`Carbon.BackendDocument` is available via packagist.  
Run the following command in your site package

```bash
composer require --no-update carbon/backenddocument
```

Then run `composer update` in your project root.

## Usage of [`Carbon.BackendDocument:Document`]

| Property                      | Default value                        | Description                                                        |
| ----------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| `singleline`                  | `true`                               | If you want to have a non-centric design, set this to `false`      |
| `content`                     | `null`                               | The content to show                                                |
| `style`                       | `null`                               | Add additional style to the document                               |
| `title`                       | `${q(node).property('title')}`       | The title of the document                                          |
| `namespace`                   | `carbon-backend`                     | The namespace for the css class                                    |
| `javascripts`                 | `null`                               | Add javscript to the document. Please provide also a `script` tag. |
| `frontendRedirect.node`       | `${q(documentNode).parent().get(0)}` | The node where the user get redirected in the frontend.            |
| `frontendRedirect.statusCode` | `301`                                | The status code for the redirection                                |

## Usage of [`Carbon.BackendDocument:Editable`]

If you use this prototype on a regular document, the editor has the default styling from `Neos.Neos:Editable`.
If you use it on [`Carbon.BackendDocument:Document`], the editor gets the look of an inspector field.

If a value gets updated, a Javascript event with the name `Carbon.BackendDocument:Editable` gets fired. This event has the following details:

-   `element`: the input/textarea/select field
-   `property`: the name of the property
-   `value`: The value of the property

| Property       | Default value               | Description                                                                      |
| -------------- | --------------------------- | -------------------------------------------------------------------------------- |
| `node`         | `node`                      | A node instance that should be used to read the property.                        |
| `property`     | `null`                      | The name of the property which should be accessed                                |
| `type`         | `input`                     | Set the type of editor. For possible values look at the next table               |
| `options`      | `Neos.Fusion:DataStructure` | Used for type `select` and `radio`                                               |
| `optionGroups` | `Neos.Fusion:DataStructure` | Used for type `select`                                                           |
| `label`        | `null`                      | Prepend a label                                                                  |
| `placeholder`  | `null`                      | Overwrite the placeholder from the nodetype definition. This can also be dynamic |
| `class`        | `null`                      | Add your own CSS class if you want to override some stylings                     |
| `style`        | `null`                      | Add your own style to the root element                                           |
| `includeCSS`   | `true`                      | Inlcude the styling.                                                             |

Be aware! If one element on a document has set `includeCSS` to true, this get's included for the whole document.

### Types

| Value    | Description                                                    |
| -------- | -------------------------------------------------------------- |
| `input`  | No linebreaks, no tags, but autogrowing textfield              |
| `select` | Select values, uses `options` and `optionGroups` DataStructure |
| `radio`  | Select values, uses `options` DataStructure                    |
| `block`  | Default editor, block style                                    |
| `inline` | Default editor, inline style                                   |

[packagist]: https://packagist.org/packages/carbon/backenddocument
[latest stable version]: https://poser.pugx.org/carbon/backenddocument/v/stable
[total downloads]: https://poser.pugx.org/carbon/backenddocument/downloads
[license]: https://poser.pugx.org/carbon/backenddocument/license
[github forks]: https://img.shields.io/github/forks/CarbonPackages/Carbon.BackendDocument.svg?style=social&label=Fork
[github stars]: https://img.shields.io/github/stars/CarbonPackages/Carbon.BackendDocument.svg?style=social&label=Stars
[github watchers]: https://img.shields.io/github/watchers/CarbonPackages/Carbon.BackendDocument.svg?style=social&label=Watch
[fork]: https://github.com/CarbonPackages/Carbon.BackendDocument/fork
[stargazers]: https://github.com/CarbonPackages/Carbon.BackendDocument/stargazers
[subscription]: https://github.com/CarbonPackages/Carbon.BackendDocument/subscription
[`carbon.backenddocument:document`]: Resources/Private/Fusion/Document.fusion
[`carbon.backenddocument:editable`]: Resources/Private/Fusion/Editable.fusion
