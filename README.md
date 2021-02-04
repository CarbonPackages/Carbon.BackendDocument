[![Latest stable version]][packagist] [![Total downloads]][packagist] [![License]][packagist] [![GitHub forks]][fork] [![GitHub stars]][stargazers] [![GitHub watchers]][subscription]

# Carbon.BackendDocument Package for Neos CMS

A small Fusion prototype to create nice only-backend documents.

## Installation

`Carbon.BackendDocument` is available via packagist.  
Run the following command in your site package

```bash
composer require --no-update carbon/backenddocument
```

Then run `composer update` in your project root.

## Usage of `Carbon.BackendDocument:Document`

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
