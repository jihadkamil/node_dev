function akses_menu(dt){
    this._id = dt._id
    this.code = dt.code
    this.name= dt.name
    this.controller = dt.controller
    this.parent_id = dt.parent_id
    this.is_delete = dt.is_delete
    this.created_date = dt.created_date
    this.created_by = dt.created_by
    this.updated_by = dt.updated_by
    this.updated_date = dt.updated_date
}

akses_menu.prototype.getData = function(){
    return{
        _id         : this._id,
        code        : this.code,
        name        : this.name,
        controller  : this.controller,
        is_delete   : this.is_delete,
        update_date : this.update_date,
        update_by   : this.update_by,
        created_by  : this.created_by,
        create_date : this.create_date
    }
}

module.exports = akses_menu