# next-dynamic-customization-prototype

⚠️⚠️⚠️ This is a prototype and is not ready for production use.

## Context

In today's SAAS world, a single codebase is often used serve websites for many different customers. Examples include online ecommerce stores like Shopify or Wix. However, different customers often have different customization requirements. While ordinary customers are usually satisfied with the ability to choose from a pre-built list of templates, components and configuration options, enterprise customers will look for tweaking the finest details in order to obtain a truly unique brand experience.

The problem therefore is how we can support such dynamic customizations in a maintainable and scalable way. Traditionally, this has been done in a few different ways:

1. Separate servers for different customers

   This is usually done by branching the codebase, adding customer-specific code to the branch and then deploying to a standalone server. Although this approach maximizes the isolation between customers, it is not the most cost effective way to utilize cloud resources. Moreover, applying changes to all servers will become more difficult as the number of customers scale upwards.

2. Use conditional logic to render different views and run different logics for different customers

   This works well when there are only a handful of customers but quickly get out of control as we continue to punch in various unrelated customizations everywhere in the codebase. It also gives a runtime penalty to other customers that do not need the specific customizations.

3. Load a user provided configuration file at runtime

   Traditionally, this only allows for very simple customizations like page titles and button colors. It is difficult to allow for very flexible layout configurations and look-and-feel customizations without making the configuration options extremely convoluted.
   
   However, [Snipcart](https://docs.snipcart.com/v3/setup/customization) took this approach to the next level by allowing their users to provide custom Vue components in a separate html file. This is an interesting idea that we are going to try to incoporate into this prototype.
   
## Technology

We will use next.js to build this prototype. It is a popular server side rendering framework based on React, which has a big ecosystem and community support and allows us to write clean component based code.

Server side rendering is often important when we need to take care of SEO and highly dynamic data.

## How it works

### core-app

`core-app` contains the core next.js app for serving the content. For ordinary customers, it simply reads in the customization options as an array of `components`, possibly from a database, and render the page with the built-in components and supported options.

For the purpose of this prototype, we simply save the components array in cookie (max 4096 bytes).

Built-in components are loaded using `next/dynamic` so that if a component is not used by a customer, it will not be loaded.

User provided `data` are passed directly into the components. Default values and error handlings are omitted for brevity. A set of predefined `actions` are also provided to all components. These can be actions that are central to the entire app like fetching additional data at runtime or updating data for users.

For enterprise level customizations, we allow an `overrideScript` to be loaded to define additional components that can be rendered or to override the built-in ones. This script can be arbitrarily complex and only the one customer that needs it will pay the cost of downloading and evaluating it. Since it is an enterprise level customer, most of the time the script will be developed by the same core-app developers and is assumed to be secure to be executed on the server directly. By excuting the script using `new Function(...)` we are able to render the custom components on both the server and the client.

The custom hook `useComponents` merge the built-in and custom components together into a single component library for the app to render.

### example-override

Here we can find 3 components that are built specifically for some customers.

1. `ExampleOverride` - a very simple component that only this customer can use

2. `Component3` - overrides the built-in Component3

3. `ExampleWithMui` - uses the same component library (`@mui/material`) as the built-in components

We use rollup to bundle the components into a static javascript file that is used at runtime by `core-app` to extend/override the built-in component library. Deployment can be done separately for each customer, and only the customer's pages will load and run this file.

The most important configuration here is to make `react` and `@mui/material` libraries external so that they are provided by `core-app` rather than being bundled together with the components. This helps to keep the bundle size small. If there are some dependencies that are only needed by one customer we can still choose to bundle them here.

We also use inline styles and css-in-js to simplify css loading.

Note that the editor is also able to load and preview the custom components if we know who the user is. If we can define the exact data requirements for each of the components, we might be able to allow editing the custom components through editor UI.

## TODOs

- [ ] separate editor from core-app to show how to share the components between them
- [ ] export data requirements for each built-in and custom components for editor to use
- [ ] replace textarea in the editor with some real UI
- [ ] employ a monorepo architecture like `nx` to synchronize the dependencies between core-app, editor and different customizations
- [ ] for loading dynamic data, instead of relying entirely on `actions` that run on client, we should have the option to preload data in `getServerSideProps`. A graphql server should be quite useful for serving such dynamic requests
- [ ] Data that are always needed like page title and logo can also be provided to all components by default like `actions`.
- [ ] load `components` and `overrideScript` from database
- [ ] enable minification of the `overrideScript`
- [ ] setup something like a storybook to help develop the overrideScripts before they are actually deployed and used by `core-app`
- [ ] allow built-in / custom components to opt out of rehydration
- [ ] use overrideScript mechanism to build common themes

## Demo

The demo app has been deployed to https://next-dynamic-customization-prototype.vercel.app/

To try it out, first click on `Go to edit` to use the editor. If this is the first time the editor is used, it will prefill some valid `components` data. Simply press `save` and `Go back to website` to view the page.

Note that `Component1`, `Component2` and `Component3` are built-in components. `overrides1.js` contains 2 new components called `ExampleOverride` and `ExampleWithMui`. It also replaces `Component3` with its own implementation. To be able to view these overriden components, simply add the query string `?filename=overrides1.js` so that it will load the file from https://ksmai.github.io/next-dynamic-customization-prototype/overrides1.js

## License

MIT
