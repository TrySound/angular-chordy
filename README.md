# angular-chordy

Customisable accordion for real-world projects.


## Usage

```js
angular.module('app', ['chordy']);
```

```html
<div ng-app="app">
	<chordy-set>
		<chordy-chord title="Title 1">
			Content 1
		</chordy-chord>
		<chordy-chord>
			<chordy-title>Title 2</chordy-title>
			<div>Content 2</div>
		</chordy-chord>
	</chordy-set>
</div>
```


## Options

```html
<chordy-set
	class="chordy-set-class"
	class-chord="chordy-chord-class"
	class-heading="chordy-title-container-class"
	class-heading-opened="chordy-heading-active-state-class"
	class-title="chordy-title-class"
	class-content="chordy-content-class">
	<chordy-chord
		title="chord title"
		opened="true"
		pinned="true"
		disabled="true">
		<chord-title>
			Title markup will override title attribute
			<span class="chordy-pin"
				ng-class="{'chordy-pin--active': chord.pinned}"
				ng-click="chord.pin($event)">
				Pin
			</span>
		</chord-title>
	</chordy-chord>
</chordy-set>
```

`chordy-chord` opened, pinned and disabled options are `false` by default.

`chordy-set`, `chordy-chord` and `chordy-title` are custom elements. You should add set `display` style manually.

## chord

`chord` controller instance available in every `chord-title` element.

### chord states

- `chord.opened`
- `chord.pinned`
- `chord.disabled`

### chord methods

- `chord.toggle($event, force)`
- `chord.pin($event, force)`

Pass null or `$event` to stop click propagation. `force` is boolean value and can be ommited to invert current state.


# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
