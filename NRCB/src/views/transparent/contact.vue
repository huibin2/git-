<template>
    <div></div>
</template>

<script>

    const contacts = weex.requireModule('weex-contacts');
    const modal = weex.requireModule('modal');
    const context = weex.requireModule('context');

    export default {
        created() {
            contacts.requestContactAuthor(data => {

                context.sessionSetString('phone', data.phone);
                context.sessionSetString('name', data.name);

                this.alertMsg(data);

                setTimeout(() => {
                    context.finish()
                }, 500);
            })
        }
    }
</script>

<style scoped>

</style>