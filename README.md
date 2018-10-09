[![Latest Stable Version](https://poser.pugx.org/carbon/backenddocument/v/stable)](https://packagist.org/packages/carbon/backenddocument)
[![Total Downloads](https://poser.pugx.org/carbon/backenddocument/downloads)](https://packagist.org/packages/carbon/backenddocument)
[![License](https://poser.pugx.org/carbon/backenddocument/license)](LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/CarbonPackages/Carbon.BackendDocument.svg?style=social&label=Fork)](https://github.com/CarbonPackages/Carbon.BackendDocument/fork)
[![GitHub stars](https://img.shields.io/github/stars/CarbonPackages/Carbon.BackendDocument.svg?style=social&label=Stars)](https://github.com/CarbonPackages/Carbon.BackendDocument/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/CarbonPackages/Carbon.FirstElement.svg?style=social&label=Watch)](https://github.com/CarbonPackages/Carbon.FirstElement/subscription)

# Carbon.BackendDocument Package for Neos CMS

A small Fusion prototype to create nice only-backend documents.

## Installation

`Carbon.BackendDocument` is available via packagist. Add `"carbon/backenddocument" : "^1.0"`
to the require section of your composer.json or run `composer require carbon/backenddocument`.

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

## License

Licensed under MIT, see [LICENSE](LICENSE)
