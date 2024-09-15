

export interface PartItem {
  id: number;
  name: string;
  price: number;
};

export type CPUData = {
  id: number;
  name: string;
  core_count: number;
  clock_speed: number;
  TDP: number;
  intergrated_graphics: string;
  CPU_socket: string;
  price: number;
};

export type GPUData = {
  id: number;
  name: string;
  chipset: string;
  manufacturer: string;
  memory: number;
  clock_speed: number;
  price: number;
};

export type RAMData = {
  id: number;
  name: string;
  memory_standard: string;
  clock_speed: number;
  memory: number;
  modules: number;
  price: number;
};

export type StorageData = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  capacity_unit: string;
  cache: number;
  interface: string;
  price: number;
};

export type MotherboardData = {
  id: number;
  name: string;
  type: string;
  CPU_socket: string;
  memory_slots: number;
  max_memory: number;
  price: number;
};

export type PSUData = {
  id: number;
  name: string;
  type: string;
  wattage: number;
  modular: string;
  price: number;
};

export type CaseData = {
  id: number;
  name: string;
  type: string;
  power_supply: string;
  fan_count: number;
  price: number;
};

export type CoolingData = {
  id: number;
  name: string,
  fan_count: number,
  max_RPM: number,
  type: string,
  price: number
};

export type PeripheralData = {
  id: number;
  name: string,
  type: string,
  iconpath: string,
  price: number
};

export type BuildData = {
  id: number;
  name: string;
  user: number;
  cpu: CPUData;
  gpu: GPUData;
  ram: RAMData;
  mb: MotherboardData;
  stor: StorageData;
  case: CaseData;
  cool: CoolingData;
  psu: PSUData;
  periph: PeripheralData;
};

export type BuildResponse = {
  pk: number;
  fields: BuildData;
};

export async function createBuild() : Promise<string | null> {
  let token = localStorage.getItem('token');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Token ${token}`
    },
  };
  
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/create-build/`, requestOptions)
    .then((response) => {
      if (response.status == 200)
        resolve(response.text());
      return null;
    })
    .catch((err) => {
       console.log(err.message);
       reject();
    });
  });
}


export async function fetchBuild(id: string) : Promise<BuildData> {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/builds/${id}/?format=json`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
       console.log(err.message);
       reject();
    });
  });
}

export async function setBuildData(buildid: string, type: string, id: string) : Promise<boolean> {
  let token = localStorage.getItem('token');

  const requestOptions = {
    method: 'POST',
    body: `type=${type}&id=${id}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Token ${token}`
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/builds/${buildid}/set_field/`, requestOptions)
    .then((response) => resolve(response.status == 200))
    .catch((err) => {
       console.log(err.message);
       reject();
    });
  });
}

export async function getBuilds() : Promise<BuildResponse[]> {
  let token = localStorage.getItem('token');

  const requestOptions = {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Token ${token}`
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/get-builds/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
       console.log(err.message);
       reject();
    });
  });
}


export function isPartCompatible(type: string, part : PartItem, build : BuildData) {
  // console.log(`Compatible check ${JSON.stringify(part)} with ${JSON.stringify(build)}`);
  if (type === 'cpus') {
    let cpuData = part as CPUData;
    if (build.mb) {
      return build.mb.CPU_socket == cpuData.CPU_socket;
    }

    return true;
  }
  if (type === 'gpus') {
    let gpuData = part as GPUData;

    return true;
  }
  if (type === 'rams') {
    let ramData = part as RAMData;
    if (build.mb) {
      return (ramData.memory * ramData.modules) <= build.mb.max_memory &&
        ramData.modules <= build.mb.memory_slots;
    }

    return true;
  }
  if (type === 'storages') {
    let storageData = part as StorageData;

    return true;
  }
  if (type === 'motherboards') {
    let mbData = part as MotherboardData;
    
    if (build.cpu) {
      if (mbData.CPU_socket != build.cpu.CPU_socket)
        return false;
    }
    if (build.ram) {
      if ((build.ram.memory * build.ram.modules) > mbData.max_memory &&
      build.ram.modules >= mbData.memory_slots)
        return false;
    }

    return true;
  }
  if (type === 'psus') {
    let psuData = part as PSUData;

    return true;
  }
  if (type === 'cases') {
    let caseData = part as CaseData;

    return true;
  }
  if (type == 'coolings') {
    let coolingData = part as CoolingData;

    return true;
  }
  return true;
}
