import { ref } from 'vue';

export const contexts = ref([])

export function resetContext() {
    contexts.value = []
}

export function addNewContext(dComponent: any) {
    const context = dComponent
    context.uuid = Date.now()
    context.dialog = true
    context.parent = getParentContextUuid(contexts.value)
    context.closeContext = async (payload) => {
        await closeContext({context, payload})
    }
    contexts.value = [...contexts.value, context]
}

export function getParentContextUuid(ctxs: Array<any>) {
    return ctxs.at(-1)?.uuid ?? 'root'
}

export async function closeContext({context, payload}) {
    if (context && !!context.onContextClose) {
        await context.onContextClose(payload)
    }
    contexts.value = contexts.value.filter((item) => item.uuid !== context.uuid)
}

export async function closeAllContexts(currentUuid: any) {
    const contextsToClose = contexts.value.filter((context) => context.uuid >= currentUuid)
    for (const context of contextsToClose) {
        await closeContext({ context, payload: null })
    }
    contexts.value = contexts.value.filter((context) => context.uuid <= currentUuid)
}