/**
 * schema of form definition
 */
/**
 * prepare form schema
 */

class SchemaPlugin {
    apply (form) {
        form.plugin('schema', function(schema, next) {
            if (!schema) {
                return next({msg: 'no schema defined'})
            }

            const schemaType = typeof schema
            if (schemaType === 'object') {
                return next(null, {obj: schema})
            } else if (schemaType === 'string') {
                setTimeout(function() {
                    return next(null, {async: schema})
                }, 1000)
            }
        })
    }
}

export default SchemaPlugin
