# LanguageModule

This module is a wrapper around `@ngx-translate/core`. It removes the need of a complex initial config. It is a plug-and-play alternative.

## LanguageService

This service is used to set/get the language of the page. It uses the localStorage to persist the selected language and emits an event each time the language changes to facilitate.

### languageChange
Event emitted when the language is changed using the service

