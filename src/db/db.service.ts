import { send_log } from "./../utils/error_log";
import { Repository } from "./db.repository";
import { Config, Persona, Pole, Registro } from "./entities";

/**
 * Static:
 * PoleService.instance
 */
export class DBService {
  private static _instance: DBService;
  private readonly repository: Repository;
  private constructor() {
    console.log("> DBService");
    
    this.repository = Repository.instance;
    this.initConfig();
  }

  public static get instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  async puntuacion(grupo: number) {
    const poleRepository = this.repository.getRepository<Pole>(Pole);
    const puntuacion = await poleRepository.find({
      where: {
        id_grupo: grupo,
      },
      relations: {
        persona: true,
      },
    });

    return puntuacion;
  }
  async persona_en_grupo(grupo: number, persona: number) {
    const poleRepository = this.repository.getRepository<Pole>(Pole);
    const puntuacion = await poleRepository.findOne({
      where: {
        id_grupo: grupo,
        persona: {
          id_persona: persona,
        },
      },
      relations: {
        persona: true,
      },
    });

    return puntuacion ? true : false;
  }

  async existe_grupo(grupo: number) {
    const poleRepository = this.repository.getRepository<Pole>(Pole);
    const puntuacion = await poleRepository.findOne({
      where: {
        id_grupo: grupo,
      },
    });

    return puntuacion ? true : false;
  }
  async annadir_persona_pole(grupo: number, id_persona: number) {
    try {
      const poleRepository = this.repository.getRepository<Pole>(Pole);
      const persona = await this.find_persona(id_persona);
      const punto = poleRepository.create({
        id_grupo: grupo,
        valor: 1,
        persona,
      });
      await poleRepository.save(punto);
      return punto;
    } catch (error) {
      console.log(error);
      send_log(error, "annadir_persona_pole");
    }
  }

  async find_persona(persona: number) {
    const personaRepository = this.repository.getRepository<Persona>(Persona);
    return await personaRepository.findOne({
      where: {
        id_persona: persona,
      },
    });
  }

  async find_pole(id_grupo: number, id_persona: number) {
    const poleRepository = this.repository.getRepository<Pole>(Pole);
    return await poleRepository.findOne({
      where: {
        persona: { id_persona },
        id_grupo,
      },
    });
  }

  /**
   *
   * @param nombre_persona
   * @param id_persona
   * @returns
   */
  async annadir_persona(nombre_persona: string, id_persona: number) {
    try {
      const personaRepository = this.repository.getRepository<Persona>(Persona);
      const persona = personaRepository.create({
        id_persona,
        nombre_persona,
      });
      await personaRepository.save(persona);
      return persona;
    } catch (error) {
      console.log(error);
      send_log(error, "annadir_persona");
    }
  }
  async actualizar_persona(nombre_persona: string, id_persona: number) {
    try {
      const personaRepository = this.repository.getRepository<Persona>(Persona);
      const persona = await this.find_persona(id_persona);
      persona.nombre_persona = nombre_persona;
      await personaRepository.save(persona);
      return persona;
    } catch (error) {
      console.log(error);
      send_log(error, "actualizar_persona");
    }
  }

  async punto(id_grupo: number, id_persona: number) {
    try {
      const poleRepository = this.repository.getRepository<Pole>(Pole);
      const pole = await this.find_pole(id_grupo, id_persona);
      pole.valor = pole.valor + 1;
      await poleRepository.save(pole);

      return pole;
    } catch (error) {
      console.log(error);
      send_log(error, "punto");
    }
  }

  async add_pole(id_grupo: number, id_persona: number) {
    const existegrupo = await this.existe_grupo(id_grupo);
    if (existegrupo) {
      const personaEnGrupo = await this.persona_en_grupo(id_grupo, id_persona);
      if (personaEnGrupo) {
        this.punto(id_grupo, id_persona);
      } else {
        this.annadir_persona_pole(id_grupo, id_persona);
      }
    } else {
      this.annadir_persona_pole(id_grupo, id_persona);
    }
  }

  async esta_grupo_registro(id_grupo: number) {
    const registroRepository =
      this.repository.getRepository<Registro>(Registro);
    const registro = await registroRepository.findOne({
      where: {
        id_grupo,
      },
    });

    return registro ? true : false;
  }

  async annadir_grupo_registro(id_grupo: number) {
    try {
      const registroRepository =
        this.repository.getRepository<Registro>(Registro);
      const registro = registroRepository.create({
        id_grupo,
      });
      await registroRepository.save(registro);
      return registro;
    } catch (error) {
      console.log(error);
      send_log(error, "annadir_grupo_registro");
    }
  }
  async clean_registro() {
    const registroRepository = this.repository.getRepository<Registro>(Registro);
    const registros = await registroRepository.find({});
    registros.forEach((e) => {
      registroRepository.delete(e);
    });
    return;
  }

  async pole(id_grupo: number) {
    const esta_registro = await this.esta_grupo_registro(id_grupo);
    !esta_registro && await this.annadir_grupo_registro(id_grupo);
    return !esta_registro 
  }

  async update_num_pole(numero: string) {
    const num_pole = await this.find_config("num_pole")
    if (num_pole) {
      num_pole.valor = numero;
      const configRepository =  this.repository.getRepository<Config>(Config);
      await configRepository.save(num_pole);
    }else {
      this.annadir_config("num_pole", numero);
    }
    
  }
  async update_horario(horario: string) {
    const h = await this.find_config("horario")
    if (h) {
      h.valor = horario;
      const configRepository =  this.repository.getRepository<Config>(Config);
      await configRepository.save(h);
    } else {
      this.annadir_config("horario", horario);
    }
  }

  async find_config(clave: string) {
    console.log("find_config", clave);
    const configRepository = this.repository.getRepository<Config>(Config);
    const config = await configRepository.findOne({
      where: {
        clave,
      },
    });
    console.log(config, "..");
    return config;
  }
  async obtener_num_pole() {
    const num_pole = await this.find_config("num_pole");
    console.log("num_pole: ", num_pole);
    
    return num_pole.valor;
  }

  async obtener_horario() {
    const horario = await this.find_config("horario");
    return horario ? horario.valor : "verano";
  }

  async tengo_persona(id_persona: number) {
        const persona = await this.find_persona(id_persona);
        return persona? true : false;
  }

  async analizar_persona(id_persona: number,nombre_persona: string) {
    const tengo = await this.tengo_persona(id_persona);
    if (tengo) {
        this.actualizar_persona(nombre_persona,id_persona);
    } else {
        this.annadir_persona(nombre_persona,id_persona)
    }
  }

  async initConfig () {
    let tengo = await this.find_config("horario")
    if(!tengo) {
        await this.annadir_config("horario", "verano")
    }
    tengo = await this.find_config("num_pole")
    if(!tengo) {
        await this.annadir_config("num_pole", "-1")

    }
  }

  async annadir_config(clave: string, valor: string) {
    try {
      const configRepository =
        this.repository.getRepository<Config>(Config);
      const config = configRepository.create({
        clave,
        valor,
      });
      await configRepository.save(config);
      return config;
    } catch (error) {
      console.log(error);
      send_log(error, "annadir_config");
    }
  }
}
