/*
* by Urushibara
*/

THREE.PixelArtGeometry = function (canvas, depth, useVertexColors) {

	THREE.Geometry.call( this );
	this.faceVertexUvs[0] = [];
	let ctx = canvas.getContext('2d'),
		w = canvas.width, 
		h = canvas.height,
		z = depth,
		v = [],
		color = new THREE.Color("#FFFFFF");
	let data = ctx.getImageData(0, 0, w, h);

	if(!useVertexColors){
		// front face
		v = [
			this.vertices.push(new THREE.Vector3(0,  0,  z)) -1,
			this.vertices.push(new THREE.Vector3(w,  0,  z)) -1,
			this.vertices.push(new THREE.Vector3(0, -h,  z)) -1,
			this.vertices.push(new THREE.Vector3(w, -h,  z)) -1,
		];
		this.faces.push(
			new THREE.Face3(v[2], v[1], v[0], THREE.vertexNormals, color, 0),
			new THREE.Face3(v[1], v[2], v[3], THREE.vertexNormals, color, 0)
		);
		this.faceVertexUvs[0].push(
			[ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
			[ new THREE.Vector2(1, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0) ]
		);

		// back face
		v = [
			this.vertices.push(new THREE.Vector3(0,  0,  0)) -1,
			this.vertices.push(new THREE.Vector3(w,  0,  0)) -1,
			this.vertices.push(new THREE.Vector3(0, -h,  0)) -1,
			this.vertices.push(new THREE.Vector3(w, -h,  0)) -1,
		];
		this.faces.push(
			new THREE.Face3(v[0], v[1], v[2], THREE.vertexNormals, color, 0),
			new THREE.Face3(v[3], v[2], v[1], THREE.vertexNormals, color, 0)
		);
		this.faceVertexUvs[0].push(
			[ new THREE.Vector2(0, 1), new THREE.Vector2(1, 1), new THREE.Vector2(0, 0) ],
			[ new THREE.Vector2(1, 0), new THREE.Vector2(0, 0), new THREE.Vector2(1, 1) ]
		);
	}

	for(let x=0;x<w;x++)
	{
		for(let y=0;y<h;y++)
		{
			//////// vertices / face ////////
			let d = (x + y * data.width) * 4;
			if(data.data[d+3]) {
				if(useVertexColors){
					color = new THREE.Color(data.data[d]<<16 ^ data.data[d+1]<<8 ^ data.data[d+2]);
				}
				color.offsetHSL(0, 0, 1-data.data[d+3]/255);
				let chk = {
					right:  x+1>=w || !data.data[(x+1 + (y  ) * data.width) * 4 + 3],
					left:   x-1<0  || !data.data[(x-1 + (y  ) * data.width) * 4 + 3],
					top:    y+1>=h || !data.data[(x   + (y+1) * data.width) * 4 + 3],
					bottom: y-1<0  || !data.data[(x   + (y-1) * data.width) * 4 + 3],
				};

				if(useVertexColors){
					// front face
					v = [ // vertex indices. (array.push() returns array.length)
						this.vertices.push(new THREE.Vector3(x,   -y,     z)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -y,     z)) -1,
						this.vertices.push(new THREE.Vector3(x,   -(y+1), z)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -(y+1), z)) -1,
					];
					this.faces.push(
						new THREE.Face3(v[2], v[1], v[0], THREE.vertexNormals, color, 0),
						new THREE.Face3(v[1], v[2], v[3], THREE.vertexNormals, color, 0)
					);
					this.faceVertexUvs[0].push(
						[ new THREE.Vector2(x/w, 1-y/h), new THREE.Vector2((x+1)/w, 1-(y+1)/h), new THREE.Vector2(x/w,     1-(y+1)/h) ],
						[ new THREE.Vector2(x/w, 1-y/h), new THREE.Vector2((x+1)/w, 1-y/h    ), new THREE.Vector2((x+1)/w, 1-(y+1)/h) ]
					);

					// back face
					v = [
						this.vertices.push(new THREE.Vector3(x,   -y,     0)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -y,     0)) -1,
						this.vertices.push(new THREE.Vector3(x,   -(y+1), 0)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -(y+1), 0)) -1,
					];
					this.faces.push(
						new THREE.Face3(v[0], v[1], v[2], THREE.vertexNormals, color, 0),
						new THREE.Face3(v[3], v[2], v[1], THREE.vertexNormals, color, 0)
					);
					this.faceVertexUvs[0].push(
						[ new THREE.Vector2((x+1)/w, 1-y/h), new THREE.Vector2(x/w, 1-(y+1)/h), new THREE.Vector2((x+1)/w, 1-(y+1)/h) ],
						[ new THREE.Vector2((x+1)/w, 1-y/h), new THREE.Vector2(x/w, 1-y/h    ), new THREE.Vector2(x/w,     1-(y+1)/h) ]
					);
				}

				if(chk.right){
					v = [
						this.vertices.push(new THREE.Vector3(x+1, -y,     z)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -y,     0)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -(y+1), z)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -(y+1), 0)) -1,
					];
					this.faces.push(
						new THREE.Face3(v[2], v[1], v[0], THREE.vertexNormals, color, 0),
						new THREE.Face3(v[1], v[2], v[3], THREE.vertexNormals, color, 0)
					);
					this.faceVertexUvs[0].push(
						[ new THREE.Vector2(x/w, 1-y/h), new THREE.Vector2((x+1)/w, 1-(y+1)/h), new THREE.Vector2(x/w,     1-(y+1)/h) ],
						[ new THREE.Vector2(x/w, 1-y/h), new THREE.Vector2((x+1)/w, 1-y/h    ), new THREE.Vector2((x+1)/w, 1-(y+1)/h) ]
					);
				}

				if(chk.left){
					v = [
						this.vertices.push(new THREE.Vector3(x, -y,     z)) -1,
						this.vertices.push(new THREE.Vector3(x, -y,     0)) -1,
						this.vertices.push(new THREE.Vector3(x, -(y+1), z)) -1,
						this.vertices.push(new THREE.Vector3(x, -(y+1), 0)) -1,
					];
					this.faces.push(
						new THREE.Face3(v[0], v[1], v[2], THREE.vertexNormals, color, 0),
						new THREE.Face3(v[3], v[2], v[1], THREE.vertexNormals, color, 0)
					);
					this.faceVertexUvs[0].push(
						[ new THREE.Vector2((x+1)/w, 1-y/h), new THREE.Vector2(x/w, 1-(y+1)/h), new THREE.Vector2((x+1)/w, 1-(y+1)/h) ],
						[ new THREE.Vector2((x+1)/w, 1-y/h), new THREE.Vector2(x/w, 1-y/h    ), new THREE.Vector2(x/w,     1-(y+1)/h) ]
					);
				}
				
				if(chk.top){
					v = [
						this.vertices.push(new THREE.Vector3(x,   -(y+1), z)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -(y+1), z)) -1,
						this.vertices.push(new THREE.Vector3(x,   -(y+1), 0)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -(y+1), 0)) -1,
					];
					this.faces.push(
						new THREE.Face3(v[2], v[1], v[0], THREE.vertexNormals, color, 0),
						new THREE.Face3(v[1], v[2], v[3], THREE.vertexNormals, color, 0)
					);
					this.faceVertexUvs[0].push(
						[ new THREE.Vector2(x/w, 1-y/h), new THREE.Vector2((x+1)/w, 1-(y+1)/h), new THREE.Vector2(x/w,     1-(y+1)/h) ],
						[ new THREE.Vector2(x/w, 1-y/h), new THREE.Vector2((x+1)/w, 1-y/h    ), new THREE.Vector2((x+1)/w, 1-(y+1)/h) ]
					);
				}

				if(chk.bottom){
					v = [
						this.vertices.push(new THREE.Vector3(x,   -y, z)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -y, z)) -1,
						this.vertices.push(new THREE.Vector3(x,   -y, 0)) -1,
						this.vertices.push(new THREE.Vector3(x+1, -y, 0)) -1,
					];
					this.faces.push(
						new THREE.Face3(v[0], v[1], v[2], THREE.vertexNormals, color, 0),
						new THREE.Face3(v[3], v[2], v[1], THREE.vertexNormals, color, 0)
					);
					this.faceVertexUvs[0].push(
						[ new THREE.Vector2((x+1)/w, 1-y/h), new THREE.Vector2(x/w, 1-(y+1)/h), new THREE.Vector2((x+1)/w, 1-(y+1)/h) ],
						[ new THREE.Vector2((x+1)/w, 1-y/h), new THREE.Vector2(x/w, 1-y/h    ), new THREE.Vector2(x/w,     1-(y+1)/h) ]
					);
				}
			}
		}
	}
	this.center();
	this.mergeVertices();
	this.computeFaceNormals();
};

THREE.PixelArtGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PixelArtGeometry.prototype.constructor = THREE.PixelArtGeometry;
