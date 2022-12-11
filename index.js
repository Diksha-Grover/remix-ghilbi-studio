var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:C:\Github-repos\remix-ghilbi-studio\app\root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ React.createElement("html", null, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("title", null, "Oh no!"), /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, error.message, /* @__PURE__ */ React.createElement(import_react2.Scripts, null)));
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\films\$filmId.tsx
var filmId_exports = {};
__export(filmId_exports, {
  action: () => action,
  default: () => FilmIndex,
  links: () => links,
  loader: () => loader,
  meta: () => meta2
});
var import_node = require("@remix-run/node");
var import_react6 = require("@remix-run/react");

// app/api/comment.ts
async function getComments(filmId) {
  const response = await fetch(`http://localhost:3001/comments?filmId=${filmId}`);
  return response.json();
}
async function addComment(comment) {
  const response = await fetch("http://localhost:3001/comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
}

// app/api/film.ts
async function getFilms(title) {
  const response = await fetch("https://ghibliapi.herokuapp.com/films");
  const films = await response.json();
  if (title) {
    return films.filter((film) => {
      return film.title.toLocaleLowerCase().includes(title.toLocaleLowerCase());
    });
  }
  return films;
}
async function getFilmById(filmId) {
  const response = await fetch(`https://ghibliapi.herokuapp.com/films/${filmId}`);
  const film = await response.json();
  const characters = await Promise.all(film.people.filter((url) => {
    return url !== "https://ghibliapi.herokuapp.com/people/";
  }).map(async (url) => {
    return await fetch(url).then((res) => res.json());
  }));
  const comments = await getComments(filmId);
  return __spreadProps(__spreadValues({}, film), { characters, comments });
}
async function getCharacterById(characterId) {
  const response = await fetch(`https://ghibliapi.herokuapp.com/people/${characterId}`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\films\$filmId.tsx
var import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-D3ABH74S.css";

// app/components/filmBanner.tsx
var import_react3 = require("@remix-run/react");
function FilmBanner({ film }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "w-full h-96 overflow-hidden relative"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full h-full flex flex-col absolute justify-between items-start"
  }, /* @__PURE__ */ React.createElement(import_react3.Link, {
    to: "/films",
    className: "text-white p-5 text-2xl hover:underline"
  }, "Go Back"), /* @__PURE__ */ React.createElement("div", {
    className: "bg-slate-700/60 p-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-6xl font-bold text-white"
  }, film.title))), /* @__PURE__ */ React.createElement("img", {
    src: film.movie_banner,
    className: "w-full h-auto",
    style: { marginTop: -100 }
  })));
}

// app/components/description.tsx
function Description({ description, image }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative bg-white  sm:py-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative sm:py-16 lg:py-0"
  }, /* @__PURE__ */ React.createElement("div", {
    "aria-hidden": "true",
    className: "hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72"
  }), /* @__PURE__ */ React.createElement("svg", {
    className: "absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12",
    width: 404,
    height: 392,
    fill: "none",
    viewBox: "0 0 404 392"
  }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("pattern", {
    id: "02f20b47-fd69-4224-a62a-4c9de5c763f7",
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    patternUnits: "userSpaceOnUse"
  }, /* @__PURE__ */ React.createElement("rect", {
    x: 0,
    y: 0,
    width: 4,
    height: 4,
    className: "text-gray-200",
    fill: "currentColor"
  }))), /* @__PURE__ */ React.createElement("rect", {
    width: 404,
    height: 392,
    fill: "url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden"
  }, /* @__PURE__ */ React.createElement("img", {
    className: "absolute inset-0 h-full w-full object-cover",
    src: image,
    alt: ""
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0  mix-blend-multiply"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t  opacity-90"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "relative px-8"
  }, /* @__PURE__ */ React.createElement("blockquote", {
    className: "mt-8"
  }, /* @__PURE__ */ React.createElement("footer", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-base font-semibold text-indigo-200"
  }))))))), /* @__PURE__ */ React.createElement("div", {
    className: "relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pt-12 sm:pt-16 lg:pt-20"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6 text-gray-500 space-y-6"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-lg"
  }, description))))));
}

// app/components/characterList.tsx
var import_react4 = require("@remix-run/react");
function CharacterList({ characters }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex-1 max-w-md"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "text-3xl"
  }, "Characters"), /* @__PURE__ */ React.createElement("ul", {
    className: "flex flex-col space-y-3 my-3"
  }, characters == null ? void 0 : characters.map((character) => /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_react4.NavLink, {
    to: "characters/" + character.id,
    prefetch: "intent",
    className: ({ isActive }) => `w-full hover:underline p-3 rounded border border-slate-400 inline-block ${isActive ? "bg-slate-300 text-black font-bold border-2" : "text-blue-500 "} `
  }, character.name)))));
}

// app/components/comment.tsx
var import_react5 = require("@remix-run/react");
function CommentsList({ filmId, comments }) {
  const transition = (0, import_react5.useTransition)();
  const actionData = (0, import_react5.useActionData)();
  const inputStyle = (fieldName) => `border border-slate-400 rounded py-2 px-3 inline-block w-full ${(actionData == null ? void 0 : actionData.errors[fieldName]) ? " border-red-500" : ""}`;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
    className: "text-3xl mb-2"
  }, "Community Comments"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col space-y-4 my-3"
  }, comments.map((comment) => /* @__PURE__ */ React.createElement("div", {
    className: "p-4 rounded border border-slate-400"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-700 font-bold text-xl mb-2"
  }, comment.name), /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-700"
  }, comment.message))), /* @__PURE__ */ React.createElement("div", {
    className: "p-4 rounded border border-slate-400"
  }, /* @__PURE__ */ React.createElement(import_react5.Form, {
    method: "post",
    action: `/films/${filmId}`
  }, /* @__PURE__ */ React.createElement("fieldset", {
    disabled: transition.state === "submitting"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "inline-block my-2"
  }, "Name:"), /* @__PURE__ */ React.createElement("input", {
    name: "name",
    type: "text",
    className: inputStyle("name")
  }), (actionData == null ? void 0 : actionData.errors.name) && /* @__PURE__ */ React.createElement("p", {
    className: "text-red-500"
  }, actionData.errors.name), /* @__PURE__ */ React.createElement("label", {
    className: "inline-block my-2"
  }, "Message:"), /* @__PURE__ */ React.createElement("textarea", {
    name: "message",
    className: inputStyle("message")
  }), (actionData == null ? void 0 : actionData.errors.message) && /* @__PURE__ */ React.createElement("p", {
    className: "text-red-500"
  }, actionData.errors.message), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
  }, transition.state === "submitting" ? "Adding..." : "Add comment"))))));
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\films\$filmId.tsx
var links = () => {
  return [{ rel: "stylesheet", href: tailwind_default }];
};
var action = async ({ request, params }) => {
  (0, import_tiny_invariant.default)(params.filmId, "expected params.filmId");
  const body = await request.formData();
  const comment = {
    name: body.get("name"),
    message: body.get("message"),
    filmId: params.filmId
  };
  const errors = { name: "", message: "" };
  if (!comment.name) {
    errors.name = "Please provide your name";
  }
  if (!comment.message) {
    errors.message = "Please provide a comment";
  }
  if (errors.name || errors.message) {
    const values = Object.fromEntries(body);
    return { errors, values };
  }
  await addComment(comment);
  return (0, import_node.redirect)(`/films/${params.filmId}`);
};
var meta2 = ({ data }) => {
  return { title: data.title, description: data.description };
};
var loader = async ({ params }) => {
  (0, import_tiny_invariant.default)(params.filmId, "Expected a Film Id");
  const film = await getFilmById(params.filmId);
  return film;
};
function FilmIndex() {
  const film = (0, import_react6.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(FilmBanner, {
    film
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Description, {
    image: film.image,
    description: film.description
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex py-5 space-x-3 p-3"
  }, /* @__PURE__ */ React.createElement(CharacterList, {
    characters: film.characters
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-1 flex flex-col justify-between"
  }, /* @__PURE__ */ React.createElement(import_react6.Outlet, null), /* @__PURE__ */ React.createElement(CommentsList, {
    filmId: film.id,
    comments: film.comments || []
  }))));
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\films\$filmId\characters.$characterId.tsx
var characters_characterId_exports = {};
__export(characters_characterId_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary2,
  default: () => Character,
  loader: () => loader2,
  meta: () => meta3
});
var import_react7 = require("@remix-run/react");
var import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/components/character.tsx
function IndividualCharacter({ id, eye_color, age, name, gender, hair_color }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-7"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-end px-4 pt-4"
  }, /* @__PURE__ */ React.createElement("div", {
    id: "dropdown",
    className: "hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700",
    "data-popper-reference-hidden": "",
    "data-popper-escaped": "",
    "data-popper-placement": "top"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-center pb-10"
  }, /* @__PURE__ */ React.createElement("h5", {
    className: "mb-1 text-xl font-medium text-gray-900 dark:text-white"
  }, name), /* @__PURE__ */ React.createElement("span", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Age: ", age), /* @__PURE__ */ React.createElement("span", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Gender: ", gender), /* @__PURE__ */ React.createElement("span", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Eye Color: ", eye_color), /* @__PURE__ */ React.createElement("span", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Hair Color: ", hair_color), /* @__PURE__ */ React.createElement("div", {
    className: "flex mt-4 space-x-3 lg:mt-6"
  }))));
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\films\$filmId\characters.$characterId.tsx
var loader2 = ({ params }) => {
  (0, import_tiny_invariant2.default)(params.characterId, "Expected a character Id");
  return getCharacterById(params.characterId);
};
var meta3 = ({ data }) => {
  return { title: data.name, description: data.id };
};
function Character() {
  const character = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-5"
  }, /* @__PURE__ */ React.createElement(IndividualCharacter, {
    id: character.id,
    name: character.name,
    hair_color: character.hair_color,
    eye_color: character.eye_color,
    age: character.age,
    gender: character.gender
  }));
}
function CatchBoundary() {
  const caught = (0, import_react7.useCatch)();
  if (caught.status === 404) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-3"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "text-3xl mb-2"
    }, "Details"), /* @__PURE__ */ React.createElement("div", {
      className: "p-4 rounded shadow-lg border bg-orange-200 border-orange-600"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-700 font-bold text-xl mb-2"
    }, caught.statusText), /* @__PURE__ */ React.createElement("p", null, caught.status, " ", caught.statusText)));
  }
  throw new Error("Unkown error");
}
function ErrorBoundary2({ error }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "mb-3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-3xl mb-2"
  }, "Details"), /* @__PURE__ */ React.createElement("div", {
    className: "p-4 rounded shadow-lg border bg-rose-200 border-rose-600"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-700 font-bold text-xl mb-2"
  }, "Uh oh... Sorry something went wrong!"), /* @__PURE__ */ React.createElement("p", null, error == null ? void 0 : error.message)));
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\parent.other.tsx
var parent_other_exports = {};
__export(parent_other_exports, {
  default: () => Other
});
function Other() {
  return /* @__PURE__ */ React.createElement("div", null, "I am OTHER");
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\films\index.tsx
var films_exports = {};
__export(films_exports, {
  default: () => FilmsIndex,
  links: () => links2,
  loader: () => loader3,
  meta: () => meta4
});
var import_react8 = require("@remix-run/react");
var links2 = () => {
  return [{ rel: "stylesheet", href: tailwind_default }];
};
var meta4 = ({ data }) => {
  return { title: "Films", description: "Ghibli Studio" };
};
var loader3 = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};
function FilmsIndex() {
  const films = (0, import_react8.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-10 font-sans"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-5xl font-bold text-center p-11"
  }, "Studio Ghibli Films \u{1F3AC}"), /* @__PURE__ */ React.createElement(import_react8.Form, {
    reloadDocument: true,
    method: "get",
    className: "py-5"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "font-bold"
  }, "Search", " ", /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "title",
    placeholder: "Type a title...",
    className: "border-2 rounded py-2 px-3"
  })), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
  }, "Search")), /* @__PURE__ */ React.createElement("ul", {
    role: "list",
    className: "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
  }, films.map((film) => /* @__PURE__ */ React.createElement("li", {
    key: film.id,
    className: "relative"
  }, /* @__PURE__ */ React.createElement(import_react8.Link, {
    key: film.id,
    to: film.id,
    className: "hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
  }, /* @__PURE__ */ React.createElement("img", {
    src: film.image,
    alt: "",
    className: "object-cover pointer-events-none group-hover:opacity-75"
  }), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "absolute inset-0 focus:outline-none"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, film.title))), /* @__PURE__ */ React.createElement("p", {
    className: "mt-2 block text-sm font-serif text-gray-900 truncate pointer-events-none"
  }, film.title)))));
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\parent.tsx
var parent_exports = {};
__export(parent_exports, {
  default: () => Parent,
  links: () => links3
});
var import_react9 = require("@remix-run/react");
var links3 = () => {
  return [{ rel: "stylesheet", href: tailwind_default }];
};
function Parent() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-20"
  }, /* @__PURE__ */ React.createElement(import_react9.Outlet, null));
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\parent\$someId.tsx
var someId_exports = {};
__export(someId_exports, {
  default: () => DynamicChild
});
var import_react10 = require("@remix-run/react");
function DynamicChild() {
  const { someId } = (0, import_react10.useParams)();
  return /* @__PURE__ */ React.createElement("div", null, "I am dynamic ", someId);
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\parent\child2.tsx
var child2_exports = {};
__export(child2_exports, {
  default: () => Child2
});
function Child2() {
  return /* @__PURE__ */ React.createElement("div", null, "I am child 2!");
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\parent\child.tsx
var child_exports = {};
__export(child_exports, {
  default: () => Child
});
function Child() {
  return /* @__PURE__ */ React.createElement("div", null, "I am child!");
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\parent\index.tsx
var parent_exports2 = {};
__export(parent_exports2, {
  default: () => ParentIndx
});
function ParentIndx() {
  return /* @__PURE__ */ React.createElement("div", null, "I am parent");
}

// route:C:\Github-repos\remix-ghilbi-studio\app\routes\index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});
var import_react11 = require("@remix-run/react");
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-20 "
  }, /* @__PURE__ */ React.createElement(import_react11.Outlet, null), /* @__PURE__ */ React.createElement("h1", null, "Welcome to Ghibli studio \u{1F3AC}"));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "fea42c1f", "entry": { "module": "/build/entry.client-M5X6CCTK.js", "imports": ["/build/_shared/chunk-4JCVSHNG.js", "/build/_shared/chunk-TOAMQMCD.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-IUGGVMM6.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": true }, "routes/films/$filmId": { "id": "routes/films/$filmId", "parentId": "root", "path": "films/:filmId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/films/$filmId-IVPWVALM.js", "imports": ["/build/_shared/chunk-E6JEP2TE.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/films/$filmId/characters.$characterId": { "id": "routes/films/$filmId/characters.$characterId", "parentId": "routes/films/$filmId", "path": "characters/:characterId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/films/$filmId/characters.$characterId-PTNVQTIE.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/films/index": { "id": "routes/films/index", "parentId": "root", "path": "films", "index": true, "caseSensitive": void 0, "module": "/build/routes/films/index-RR6NUHJL.js", "imports": ["/build/_shared/chunk-E6JEP2TE.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-ABCFZU65.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/parent": { "id": "routes/parent", "parentId": "root", "path": "parent", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/parent-EOK55WRQ.js", "imports": ["/build/_shared/chunk-E6JEP2TE.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/parent.other": { "id": "routes/parent.other", "parentId": "root", "path": "parent/other", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/parent.other-E7B4ELYC.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/parent/$someId": { "id": "routes/parent/$someId", "parentId": "routes/parent", "path": ":someId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/parent/$someId-O3P5D53W.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/parent/child": { "id": "routes/parent/child", "parentId": "routes/parent", "path": "child", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/parent/child-RM2L33GR.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/parent/child2": { "id": "routes/parent/child2", "parentId": "routes/parent", "path": "child2", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/parent/child2-HJR5JLT7.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/parent/index": { "id": "routes/parent/index", "parentId": "routes/parent", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/parent/index-BYKSOUE5.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-FEA42C1F.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/films/$filmId": {
    id: "routes/films/$filmId",
    parentId: "root",
    path: "films/:filmId",
    index: void 0,
    caseSensitive: void 0,
    module: filmId_exports
  },
  "routes/films/$filmId/characters.$characterId": {
    id: "routes/films/$filmId/characters.$characterId",
    parentId: "routes/films/$filmId",
    path: "characters/:characterId",
    index: void 0,
    caseSensitive: void 0,
    module: characters_characterId_exports
  },
  "routes/parent.other": {
    id: "routes/parent.other",
    parentId: "root",
    path: "parent/other",
    index: void 0,
    caseSensitive: void 0,
    module: parent_other_exports
  },
  "routes/films/index": {
    id: "routes/films/index",
    parentId: "root",
    path: "films",
    index: true,
    caseSensitive: void 0,
    module: films_exports
  },
  "routes/parent": {
    id: "routes/parent",
    parentId: "root",
    path: "parent",
    index: void 0,
    caseSensitive: void 0,
    module: parent_exports
  },
  "routes/parent/$someId": {
    id: "routes/parent/$someId",
    parentId: "routes/parent",
    path: ":someId",
    index: void 0,
    caseSensitive: void 0,
    module: someId_exports
  },
  "routes/parent/child2": {
    id: "routes/parent/child2",
    parentId: "routes/parent",
    path: "child2",
    index: void 0,
    caseSensitive: void 0,
    module: child2_exports
  },
  "routes/parent/child": {
    id: "routes/parent/child",
    parentId: "routes/parent",
    path: "child",
    index: void 0,
    caseSensitive: void 0,
    module: child_exports
  },
  "routes/parent/index": {
    id: "routes/parent/index",
    parentId: "routes/parent",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: parent_exports2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
