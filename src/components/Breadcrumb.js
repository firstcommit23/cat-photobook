export default function Breadcrumb({$app, initialState, onClick}) {
    this.state = initialState;
    
    this.$target = document.createElement('nav')
    this.$target.className = 'Breadcrumb'
    $app.appendChild(this.$target)

    this.onClick = onClick

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `<div class="nav-item">root</div>${
            this.state.map(
                (node, index) => `<div class="nav-item" data-index="${node.id}">${node.name}</div>`).join('')}`
    }

    this.$target.addEventListener("click", e => {
        const $item = e.target.closest(".nav-item")

        if ($item) {
            const { index } = $item.dataset
            // root의 경우 index undefined
            this.onClick(index)
        }
    })

    this.render()
    
}